import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddProduct from "./AddProduct";
import { supabase } from "../../database/supabase";

function EditProduct() {
  const param = useParams();
  const [existingProduct, setExistingProduct] = useState(null);

  const product = async (id) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Fetch error:", error);
    } else {
      setExistingProduct(data);
      return data;
    }
  };

  useEffect(() => {
    product(param.id);
  }, [param.id]);
  return (
    <>
      EditProduct {param.id}
      <AddProduct product={existingProduct} />
    </>
  );
}

export default EditProduct;
