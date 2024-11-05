import React, { useState } from 'react';
import axios from 'axios';
import styles from './ProductForm.module.css';

const ProductForm = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0.0);
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const reponse = await axios.post('http://localhost:3001/products', {
                name,
                price: parseFloat(price),
                quantity: parseInt(quantity),
            });

            setName('');
            setPrice('');
            setQuantity('');
        } catch (error) {
            console.error('Error adding product: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Adicionar Novo Produto</h2>
            <div className={styles.formGroup}>
                <label>Nome do produto</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label>Preço</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label>Quantidade</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <div className={styles.wrap}>
                <button type="submit" className={styles.button}>Salvar</button>
            </div>
        </form>
    );
};

export default ProductForm;