import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductList.module.css';
import {Link, Route, Routes} from 'react-router-dom';
import EditProductModal from '../EditProductModal/EditProductModal';

import editIcon from '../../assets/edit-icon.svg';
import deleteIcon from '../../assets/lixeira-icon.svg';

const ProductList = () => {
    const[products, setProducts] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            })
    }, []);

    const removeProduct = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
    };

    const updateProduct = (updatedProduct) => {
        setProducts(products.map(product =>
            product.id === updatedProduct.id ? updatedProduct : product
        ));
    };

    const handleDelete = async () => {
        if (productToDelete) {
            try {
                await axios.delete(`http://localhost:3001/products/${productToDelete}`);
                removeProduct(productToDelete);
                setIsDeleteModalOpen(false); // Fecha o modal de exclusão
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (productId) => {
        setProductToDelete(productId);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className={styles.container}>
            <h1>Produtos</h1>

            <div className={styles.gridContainer}>
                <div className={styles.gridHeader}>
                    <span></span>
                    <span>Nome</span>
                    <span>Preço</span>
                    <span>Quantidade</span>
                    <span></span>
                </div>

                <div className={styles.productGrid}>
                    {products.map(product => (
                        <div key={product.id} className={styles.product}>
                            <div className={styles.actions}>
                                <img
                                    src={editIcon}
                                    alt="Edit"
                                    className={styles.icon}
                                    onClick={() => openEditModal(product)}
                                />
                            </div>
                            <span className={styles.productName}>{product.name}</span>
                            <span>R${product.price}</span>
                            <span>{product.quantity}</span>
                            <div className={styles.actions}>
                                <img
                                    src={deleteIcon}
                                    alt="Delete"
                                    className={styles.icon}
                                    onClick={() => openDeleteModal(product.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Link to="/add-product" className={styles.addButton}>Adicionar novo produto</Link>

            {selectedProduct && (
                <EditProductModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedProduct(null);
                    }}
                    product={selectedProduct}
                    onUpdate={updateProduct}
                />
            )}

            {isDeleteModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Apagar produto</h3>
                        <p>Tem certeza que deseja excluir o produto?</p>
                        <div className={styles.buttons}>
                            <button onClick={() => setIsDeleteModalOpen(false)} className={styles.cancelButton}>Cancelar</button>
                            <button onClick={handleDelete} className={styles.confirmButton}>Sim, Apagar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;