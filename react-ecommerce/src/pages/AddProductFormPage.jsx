import React from "react";
import Navbar from "../features/navbar/Navbar";
import AddProductForm from "../features/admin/components/AddProductForm";

export default function AddProductFormPage() {
  return (
    <Navbar>
      <AddProductForm></AddProductForm>
    </Navbar>
  );
}
