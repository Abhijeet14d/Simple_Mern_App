import { useState } from "react";
import { 
  Container, 
  VStack, 
  Heading, 
  Box, 
  useColorModeValue, 
  Input, 
  Button,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!newProduct.name.trim()) {
      newErrors.name = "Product name is required";
    }
    if (!newProduct.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(newProduct.price) || Number(newProduct.price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check all fields and try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://productapp-l84i.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
        }),
      });
      
      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        // Reset form
        setNewProduct({
          name: "",
          price: "",
          image: "",
        });
        
        // Navigate to home page after successful creation
        navigate('/');
      } else {
        throw new Error(data.message || 'Failed to add product');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Container maxW={"container.sm"} py={8}>
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={8}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          rounded={"lg"}
          shadow={"lg"}
        >
          <VStack spacing={6}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Product Name</FormLabel>
              <Input
                placeholder="Enter product name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.price}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Enter price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={handleInputChange}
              />
              <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.image}>
              <FormLabel>Image URL</FormLabel>
              <Input
                placeholder="Enter image URL"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
              />
              <FormErrorMessage>{errors.image}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              onClick={handleAddProduct}
              w={"full"}
              size="lg"
              isLoading={isLoading}
              loadingText="Adding Product"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;