// src/components/EditProductModal/EditProductModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EditProductModal.module.css';

const EditProductModal = ({ isOpen, onClose, product, onUpdate }) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setQuantity(product.quantity);
        }
    }, [product]);

    if (!isOpen || !product) return null;

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/products/${product.id}`, {
                name,
                price: parseFloat(price),
                quantity: parseInt(quantity),
            });
            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3 className={styles.title}>Editar Produto</h3>
                <label>Nome</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Preço</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                <label>Quantidade</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <div className={styles.buttons}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    <button onClick={handleSave} className={styles.saveButton}>Salvar Alterações</button>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;
