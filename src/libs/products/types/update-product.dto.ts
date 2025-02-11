import { CreateProductAttributeDto } from "./create-product-attribute.dto";
import { CreateProductVariantDto } from "./create-product-variant.dto";

import { ProductType } from "@/types/common";

export interface UpdateProductDto {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  productType?: ProductType;
  downloadLink?: string;
  stock?: number;
  attributes?: CreateProductAttributeDto[];
  variants?: CreateProductVariantDto[];
}
