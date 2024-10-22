import { useState } from "react";
import { Container, VStack, Heading, Box, useColorModeValue, Input, Button } from "@chakra-ui/react";


const CreatePage = () => {
  const [newProduct, setnewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleAddProduct = async() => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        alert("Product added successfully");
        setnewProduct({
          name: "",
          price: "",
          image: "",
        });``
      }
    } catch (error) {
      console.error("Error:", error);
    }
    
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setnewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) => setnewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setnewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
