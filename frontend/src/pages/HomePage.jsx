import { Container, SimpleGrid, Text, VStack, useToast } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const toast = useToast();

  const fetchProduct = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data.data);
  }

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message);
      }

      setProducts(products.filter(product => product._id !== productId));
      
      toast({
        title: "Product deleted.",
        description: "The product has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete product",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Add this new function for updating products
  const handleUpdate = async (productId, updatedData) => {
    try {
      const res = await fetch(`https://productapp-l84i.onrender.com/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message);
      }

      // Update the products state with the new data
      setProducts(products.map(product => 
        product._id === productId ? { ...product, ...updatedData } : product
      ));
      
      toast({
        title: "Product updated.",
        description: "The product has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to update product",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw err; // Re-throw the error to be handled by the ProductCard component
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={10}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={6}
        >
          {products.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onDelete={handleDelete}
              onUpdate={handleUpdate} // Add this prop
            />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No Products found {" "}
            <Link to={"/create"}>
              <Text
                as='span'
                color={"blue.500"}
                _hover={{textDecoration: "underline"}}
              >
                Create a Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

export default Homepage;