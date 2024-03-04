import { matchTransactionsToOrders } from "./transactionMatcher";
import { Transaction, Order, MatchedTransaction } from "./types";
import { faker } from '@faker-js/faker';

describe('matchTransactionsToOrders', () => {
    // Mock transactions and orders for testing
    const transactions: Transaction[] = [];
    const orders: Order[] = [];

    // Generate mock transactions
    for (let i = 0; i < 10; i++) {
        const transaction: Transaction = {
            type: 'txn',
            customerName: faker.person.fullName(),
            orderId: faker.random.alphaNumeric(6),
            date: faker.date.past().toISOString().slice(0, 10), 
            product: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price()),
            transactionType: 'paymentReceived',
            transactionDate: faker.date.past().toISOString().slice(0, 10),
            transactionAmount: parseFloat(faker.finance.amount())
        };
        transactions.push(transaction);
    }

    // Generate mock orders
    for (let i = 0; i < 5; i++) {
        const order: Order = {
            type: 'order',
            customerName: faker.name.fullName(),
            orderId: faker.random.alphaNumeric(6),
            date: faker.date.past().toISOString().slice(0, 10),
            product: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price())
        };
        orders.push(order);
    }

    test('exact match', () => {
        const matchedTransactions: MatchedTransaction[] = matchTransactionsToOrders(transactions, orders, false);
        
        matchedTransactions.forEach(match => {
            expect(match.isExactMatch).toBe(true); // Check if it's an exact match
            expect(match.transactions.every(transaction => transaction.type === 'txn')).toBe(true); // Check if all transactions have type 'txn'
            expect(match.transactions.every(transaction => transaction.orderId === match.order.orderId)).toBe(true); // Check if all transactions have the correct order ID
            expect(match.transactions.every(transaction => transaction.date === match.order.date)).toBe(true); // Check if all transactions have the correct date
            expect(match.transactions.every(transaction => transaction.product === match.order.product)).toBe(true);
            if(match.isReconciled) {
                expect(match.transactions.reduce((sum, transaction) => sum + transaction.transactionAmount, 0)).toBe(match.order.price); 
            }
        });
    });

    test('fuzzy match', () => {
        const matchedTransactions: MatchedTransaction[] = matchTransactionsToOrders(transactions, orders, true);

        matchedTransactions.forEach(match => {
            expect(match.isExactMatch).toBe(false); // Check if it's not an exact match
            expect(match.transactions.every(transaction => transaction.type === 'txn')).toBe(true); // Check if all transactions have type 'txn'
            expect(match.transactions.every(transaction => transaction.orderId === match.order.orderId)).toBe(true); // Check if all transactions have the correct order ID
            expect(match.transactions.every(transaction => transaction.date === match.order.date)).toBe(true); // Check if all transactions have the correct date
            expect(match.transactions.every(transaction => transaction.product === match.order.product)).toBe(true);
            if(match.isReconciled) {
                expect(match.transactions.reduce((sum, transaction) => sum + transaction.transactionAmount, 0)).toBe(match.order.price); 
            }
        });
    });
});
