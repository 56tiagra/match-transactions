export interface Transaction {
    type: string;
    customerName: string;
    orderId: string;
    date: string;
    product: string;
    price: number;
    transactionType: string;
    transactionDate: string;
    transactionAmount: number;
}

export interface Order {
    type: string;
    product: string;
    customerName: string;
    orderId: string;
    date: string;
    price: number;
}

export interface MatchedTransaction {
    order: Order;
    transactions: Transaction[];
    isExactMatch: boolean;
    isReconciled: boolean;
    bestMatchScore?: number;
}
