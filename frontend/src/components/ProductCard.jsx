import { 
    Box, 
    Image, 
    Heading, 
    Text, 
    HStack, 
    IconButton, 
    useColorModeValue,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'

const ProductCard = ({ product, onDelete, onUpdate }) => {
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const cancelRef = useRef()

    const [editForm, setEditForm] = useState({
        name: product.name,
        price: product.price,
        image: product.image
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditForm(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) : value
        }))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            // Validate form data
            if (!editForm.name || !editForm.price || !editForm.image) {
                return
            }

            // Call the parent's onUpdate function
            await onUpdate(product._id, editForm)
            
            // Close the modal only after successful update
            onEditClose()
        } catch (error) {
            // Error handling is now done in the parent component
            console.error('Error updating product:', error)
        }
    }
    
    return (
        <>
            <Box
                shadow={'lg'}
                rounded={'lg'}
                overflow={'hidden'}
                transition={'all 0.5s'}
                _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
                bg={bg}
            >
                <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />

                <Box p={4}>
                    <Heading as='h3' size='md' mb={2}>
                        {product.name}
                    </Heading>
                    <Text
                        fontWeight={'bold'}
                        fontSize={'xl'}
                        color={textColor}
                        mb={4}
                    >${product.price}</Text>
                    <HStack spacing={2}>
                        <IconButton 
                            icon={<EditIcon />} 
                            aria-label="Edit product"
                            onClick={onEditOpen}
                        />
                        <IconButton 
                            icon={<DeleteIcon />} 
                            aria-label="Delete product"
                            onClick={onDeleteOpen}
                            colorScheme="red"
                        />
                    </HStack>
                </Box>
            </Box>

            {/* Edit Modal */}
            <Modal isOpen={isEditOpen} onClose={onEditClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleUpdate}>
                        <ModalHeader>Edit Product</ModalHeader>
                        <ModalBody>
                            <FormControl mb={4} isRequired>
                                <FormLabel>Product Name</FormLabel>
                                <Input 
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl mb={4} isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input 
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={editForm.price}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl mb={4} isRequired>
                                <FormLabel>Image URL</FormLabel>
                                <Input 
                                    name="image"
                                    value={editForm.image}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" colorScheme="blue" mr={3}>
                                Update
                            </Button>
                            <Button onClick={onEditClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>

            {/* Delete AlertDialog */}
            <AlertDialog
                isOpen={isDeleteOpen}
                leastDestructiveRef={cancelRef}
                onClose={onDeleteClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Product
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete {product.name}? This action cannot be undone.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onDeleteClose}>
                                Cancel
                            </Button>
                            <Button 
                                colorScheme='red' 
                                onClick={() => {
                                    onDelete(product._id);
                                    onDeleteClose();
                                }} 
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}

export default ProductCard