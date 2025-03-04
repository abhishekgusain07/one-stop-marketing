"use client"
import { getProductsOfUser } from '@/utils/data/user/products/getProductsOfUser';
import { Product } from '@/utils/types'
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Plus, Package, ArrowRight, X, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewProduct } from "@/utils/types";
import { createProduct } from '@/utils/data/user/products/createProduct';
import { productFormSchema, ProductFormValues } from '@/utils/zodTypes';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


function ProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [fetchingProducts, setFetchingProducts] = useState<Boolean>(false);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchProductsOfUser = async() => {
      try {
        setFetchingProducts(true)
        const res: Product[] | null = await getProductsOfUser();
        setProducts(res);
        toast.success("Products loaded successfully")
      } catch (error) {
        toast.error("Failed to fetch products")
        console.log(error);
      } finally {
        setFetchingProducts(false)
      }
    }
    fetchProductsOfUser()
  }, [refreshTrigger])

  const onSubmit = async (data: ProductFormValues) => {
    console.log("here")
    try {
      setIsSubmitting(true);
      const newProduct = await createProduct(data);
      toast.success("Product created successfully!");
      setOpen(false);
      form.reset();
      setRefreshTrigger(prev => prev + 1);
      
    } catch (error) {
      toast.error("Failed to create product");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      // TODO: Implement deleteProduct API call
      // await deleteProduct(product.id);
      toast.success("Product deleted successfully");
      setProductToDelete(null);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    }
  };

  if(fetchingProducts) {
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <Loader2 className='size-4 animate-spin' />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Products</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="size-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-6">
            <div className="flex justify-between items-center mb-6">
              <DialogTitle className="text-2xl font-semibold">Add new product</DialogTitle>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ReelFarm" 
                          {...field} 
                          disabled={isSubmitting}
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">What it does</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="ReelFarm helps X solve Y by doing Z"
                          className="resize-none mt-2"
                          {...field}
                          disabled={isSubmitting}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-slate-500 mt-2">
                        This information is used as context for generating hooks. The more, the better.
                      </p>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                    className="px-6"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 bg-gray-600 hover:bg-gray-700"
                  >
                    {isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      'Add product'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <AlertDialog 
        open={productToDelete !== null} 
        onOpenChange={(open) => !open && setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{productToDelete?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => productToDelete && handleDeleteProduct(productToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {(!products || products.length === 0) ? (
        <Card className="p-8 text-center bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <Package className="size-12 text-slate-400" />
            <h2 className="text-xl font-semibold text-slate-700">No Products Yet</h2>
            <p className="text-slate-600">
              Start your UGC journey by adding your first product. Create engaging content and reach more customers!
            </p>
            <Button className="mt-4 flex items-center gap-2">
              Get Started
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-slate-600 text-sm line-clamp-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setProductToDelete(product)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsPage;