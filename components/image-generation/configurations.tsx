"use client"
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

// Define the schema for type safety
const configSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  model: z.string({
    required_error: "Model is required"
  }),
  go_fast: z.boolean().default(true),
  guidance: z.number().min(0).max(20).default(3.5),
  num_outputs: z.number().int().min(1).max(4).default(1),
  aspect_ratio: z.enum(['1:1', '16:9', '9:16', '4:3', '3:4']).default('1:1'),
  output_format: z.enum(['webp', 'png', 'jpg']).default('webp'),
  output_quality: z.number().int().min(1).max(100).default(80),
  prompt_strength: z.number().min(0).max(1).default(0.8),
  num_inference_steps: z.number().int().min(1).max(100).default(28),
});

type ConfigFormData = z.infer<typeof configSchema>;

const InfoTooltip = ({ content }: { content: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-4 w-4 ml-2 inline-block text-muted-foreground" />
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs">{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const Configuration = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      model: "stable-diffusion-v1.5",
      go_fast: true,
      guidance: 3.5,
      num_outputs: 1,
      aspect_ratio: '1:1',
      output_format: 'webp',
      output_quality: 80,
      prompt_strength: 0.8,
      num_inference_steps: 28,
    },
  });

  const guidance = watch("guidance");
  const promptStrength = watch("prompt_strength");
  const inferenceSteps = watch("num_inference_steps");

  const onSubmit = (data: ConfigFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Card className="w-full max-w-[95%] md:max-w-2xl mx-auto transition-all duration-300 ease-in-out">
      <CardContent className="p-4 md:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            {/* Model Selection - Full width */}
            <div className="space-y-2 w-full">
              <Label>
                Model
                <InfoTooltip content="Select the AI model to generate your image. Different models have different strengths and capabilities." />
              </Label>
              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stable-diffusion-v1.5">Stable Diffusion v1.5</SelectItem>
                        <SelectItem value="stable-diffusion-v2.1">Stable Diffusion v2.1</SelectItem>
                        <SelectItem value="midjourney-v4">Midjourney v4</SelectItem>
                        <SelectItem value="dalle-3">DALL·E 3</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.model && (
                      <span className="text-red-500 text-sm">{errors.model.message}</span>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Number of Outputs - Full width */}
            <div className="space-y-2 w-full">
              <Label>
                Number of Outputs
                <InfoTooltip content="Generate multiple variations at once. More outputs take longer to generate but give you more options to choose from." />
              </Label>
              <Input
                type="number"
                min={1}
                max={4}
                {...control.register('num_outputs', { valueAsNumber: true })}
              />
            </div>

            {/* Sliders - Full width */}
            <div className="space-y-4 w-full">
              {/* Guidance Scale - Full width */}
              <div className="space-y-2">
                <Label>
                  Guidance Scale: {guidance.toFixed(1)}
                  <InfoTooltip content="Controls how closely the AI follows your prompt. Higher values (7-20) produce images that match your prompt more closely but may be less creative. Lower values (1-7) allow more creative freedom." />
                </Label>
                <Controller
                  name="guidance"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      value={[field.value]}
                      min={0}
                      max={20}
                      step={0.1}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  )}
                />
              </div>

              {/* Inference Steps - Now as slider */}
              <div className="space-y-2">
                <Label>
                  Inference Steps: {inferenceSteps}
                  <InfoTooltip content="Number of denoising steps. Recommended range is 28-50. Lower numbers produce lower quality outputs but generate faster. Higher numbers may improve quality but take longer." />
                </Label>
                <Controller
                  name="num_inference_steps"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      value={[field.value]}
                      min={1}
                      max={100}
                      step={1}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  )}
                />
              </div>

              {/* Prompt Strength - Full width */}
              <div className="space-y-2">
                <Label>
                  Prompt Strength: {promptStrength.toFixed(1)}
                  <InfoTooltip content="When using image-to-image mode, this controls how much the AI should modify the input image. 1.0 means complete modification, 0.0 means no modification." />
                </Label>
                <Controller
                  name="prompt_strength"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      value={[field.value]}
                      min={0}
                      max={1}
                      step={0.1}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  )}
                />
              </div>
            </div>

            {/* Two columns for Aspect Ratio and Output Format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Aspect Ratio */}
              <div className="space-y-2">
                <Label>
                  Aspect Ratio
                  <InfoTooltip content="The width-to-height ratio of the generated image. Choose based on where you plan to use the image (e.g., 1:1 for social media posts, 16:9 for desktop wallpapers)." />
                </Label>
                <Controller
                  name="aspect_ratio"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select aspect ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1:1">1:1 (Square)</SelectItem>
                        <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                        <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                        <SelectItem value="4:3">4:3</SelectItem>
                        <SelectItem value="3:4">3:4</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Output Format */}
              <div className="space-y-2">
                <Label>
                  Output Format
                  <InfoTooltip content="WebP offers the best compression, PNG preserves quality but has larger file sizes, JPG is good for photographs but may show compression artifacts." />
                </Label>
                <Controller
                  name="output_format"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="webp">WebP</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="jpg">JPG</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Fast Mode Toggle */}
            <div className="space-y-2 w-full">
              <Controller
                name="go_fast"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap items-center gap-2">
                    <Checkbox
                      id="go_fast"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="go_fast" className="flex items-center flex-wrap gap-1">
                      Fast Mode
                      <InfoTooltip content="Run faster predictions with model optimized for speed (using fp8 quantization). Disable to run in original bf16 for potentially higher quality." />
                    </Label>
                  </div>
                )}
              />
            </div>

            {/* Prompt Input */}
            <div className="space-y-2 w-full">
              <Label htmlFor="prompt" className="flex items-center flex-wrap gap-1">
                Prompt
                <InfoTooltip content="Describe the image you want to generate in detail. The more specific your description, the better the results." />
              </Label>
              <Controller
                name="prompt"
                control={control}
                render={({ field }) => (
                  <div>
                    <Textarea
                      {...field}
                      id="prompt"
                      placeholder="Describe the image you want to generate..."
                      className="min-h-[100px] w-full"
                    />
                    {errors.prompt && (
                      <span className="text-red-500 text-sm">{errors.prompt.message}</span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-6">
            Generate Image
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Configuration;