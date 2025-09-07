"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <div className="flex justify-center items-center">
      <Card className="overflow-hidden rounded-lg shadow-md border-gray-300 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          {currentProduct.images && currentProduct.images[0] && (
            <div className="relative w-full md:w-3/5 h-80 md:max-h">
              <Image
                alt={currentProduct.name}
                src={currentProduct.images[0]}
                fill
                style={{ objectFit: "cover" }}
                className="transition-opacity duration-500 ease-in-out"
              />
            </div>
          )}
          <CardContent className="w-full md:w-2/5 flex flex-col justify-center items-start p-6">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {currentProduct.name}
            </CardTitle>
            {price && price.unit_amount && (
              <p className="text-xl font-semibold text-gray-700">
                ₹{(price.unit_amount / 100).toFixed(2)}
              </p>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
