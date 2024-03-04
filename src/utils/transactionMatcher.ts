import { MatchedTransaction, Order, Transaction } from "./types";
import stringSimilarity from 'string-similarity';

export const matchTransactionsToOrders = (
    transactions: Transaction[],
    orders: Order[],
    useFuzzyMatch: boolean
): MatchedTransaction[] => {
    if (useFuzzyMatch) {
        return fuzzyMatch(transactions, orders);
    }
    return exactMatch(transactions, orders);
};


const exactMatch = (
    transactions: Transaction[],
    orders: Order[]
): MatchedTransaction[] => {
    const matchedTransactions: MatchedTransaction[] = [];

    for (const order of orders) {
        const orderTransactions: Transaction[] = [];

        // Filter transactions for the current order
        const orderRelatedTransactions = transactions.filter(transaction =>
            transaction.customerName === order.customerName &&
            transaction.orderId === order.orderId &&
            transaction.date === order.date &&
            transaction.product === order.product
        );

        // Calculate the total amount of the related transactions
        const totalTransactionAmount = orderRelatedTransactions.reduce((total, transaction) => total + transaction.transactionAmount, 0);

        // Check if the total transaction amount matches the order amount
        const isReconciled = totalTransactionAmount === order.price;

        if (isReconciled) {
            const matchedTransaction: MatchedTransaction = {
                order,
                transactions: orderRelatedTransactions,
                isExactMatch: true,
                isReconciled: true
            };
            matchedTransactions.push(matchedTransaction);
        } else {
            const matchedTransaction: MatchedTransaction = {
                order,
                transactions: orderRelatedTransactions,
                isExactMatch: true,
                isReconciled: false
            };
            matchedTransactions.push(matchedTransaction);
        }
    }

    return matchedTransactions;
};

const fuzzyMatch = (
    transactions: Transaction[],
    orders: Order[]
): MatchedTransaction[] => {
    const matchedTransactions: MatchedTransaction[] = [];

    for (const order of orders) {
        const orderTransactions: Transaction[] = [];
        let bestMatchScore = 0;

        for (const transaction of transactions) {
            // Calculate similarity scores for customer name, order ID, and product
            const customerNameScore = stringSimilarity.compareTwoStrings(transaction.customerName.toLowerCase(), order.customerName.toLowerCase());
            const orderIdScore = stringSimilarity.compareTwoStrings(transaction.orderId.toLowerCase(), order.orderId.toLowerCase());
            const productScore = stringSimilarity.compareTwoStrings(transaction.product.toLowerCase(), order.product.toLowerCase());

            // Calculate an overall similarity score
            const overallScore = (customerNameScore + orderIdScore + productScore) / 3;

            // Update the best match score if the current order has a higher overall score
            bestMatchScore = Math.max(bestMatchScore, overallScore);

            // Check if the transaction belongs to the current order based on a similarity threshold
            if (overallScore > 0.7) { // Adjust the threshold as needed
                orderTransactions.push(transaction);
            }
        }

        // Calculate the total amount of the related transactions
        const totalTransactionAmount = orderTransactions.reduce((total, transaction) => total + transaction.transactionAmount, 0);

        // Check if the total transaction amount matches the order amount
        const isReconciled = totalTransactionAmount === order.price;

        if (bestMatchScore > 0) {
            const matchedTransaction: MatchedTransaction = {
                order,
                transactions: orderTransactions,
                isExactMatch: false, // Since it's a fuzzy match, set isExactMatch to false
                isReconciled,
                bestMatchScore: bestMatchScore
            };
            matchedTransactions.push(matchedTransaction);
        }
    }

    return matchedTransactions;
};
