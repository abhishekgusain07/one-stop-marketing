import React from "react";
import { Card, CardContent } from "../ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"
import Image from "next/image";


const images = [
    {
        src: '/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg',
        alt: 'image'
    },
    {
        src: '/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg',
        alt: 'image'
    },
    {
        src: '/hero-images/Confident Woman in Red Outfit.jpeg',
        alt: 'image'
    },
    {
        src: '/hero-images/Confident Woman in Urban Setting.jpeg',
        alt: 'image'
    },
    {
        src: '/hero-images/Futuristic Helmet Portrait.jpeg',
        alt: 'image'
    },
    {
        src: '/hero-images/Futuristic Woman in Armor.jpeg',
        alt: 'image'
    }
    
]

const GeneratedImages = () => {
    if(images.length == 0) {
        return <Card className="w-full max-w-2xl bg-muted">
            <CardContent className="flex aspect-square items-center p-6">
                <span className="text-2xl ">No Images generate</span>
            </CardContent>
        </Card>
    }
    return(
        <Carousel className="w-full max-w-2xl">
            <CarouselContent>
                { 
                    images.map((image, index) => {
                        return (
                            <CarouselItem key={index}>
                                <div className="flex relative items-center justify-center rounded-lg aspect-square overflow-hidden">
                                    <Image src={image.src} alt={image.alt} fill className="w-full h-full object-cover"/>
                                </div>
                            </CarouselItem>
                        )
                    })
                }
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext />
        </Carousel>
    )
}

export default GeneratedImages;