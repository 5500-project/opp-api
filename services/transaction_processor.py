from datetime import datetime, timedelta
from modules.transaction import Transaction
from modules.user import User

class TransactionProcessor:
    def __init__(self, db_session):
        self.db_session = db_session

    def process_payment(self, user_id, amount, payment_token, payment_type):
        # Assuming that payment token is a secure reference to the customer's payment method
        # and that you've already performed validation and authorization using a payment gateway.

        # Create a new Transaction object and save it to the database
        transaction = Transaction(user_id=user_id, amount=amount, payment_token=payment_token,
                                  payment_type=payment_type, status='in-processing')
        self.db_session.add(transaction)
        self.db_session.commit()
        return transaction

    def calculate_total_balance(self, user_id):
        # Calculate the total balance for fully processed transactions
        transactions = self.db_session.query(Transaction).filter_by(user_id=user_id, status='processed').all()
        return sum(transaction.amount for transaction in transactions)

    def calculate_balance_for_period(self, user_id, start_date, end_date):
        # Calculate the balance for a specific time period
        transactions = self.db_session.query(Transaction).filter(
            Transaction.user_id == user_id,
            Transaction.status == 'processed',
            Transaction.process_date >= start_date,
            Transaction.process_date <= end_date
        ).all()
        return sum(transaction.amount for transaction in transactions)

    def get_all_transactions(self, user_id):
        # Get a list of all transactions for a user
        return self.db_session.query(Transaction).filter_by(user_id=user_id).all()

    def get_pending_transactions(self, user_id):
        # Get a list of all in-processing or pending transactions
        return self.db_session.query(Transaction).filter_by(user_id=user_id, status='in-processing').all()

# Assuming you have a database session 'db_session' available
# You would create an instance of TransactionProcessor like this:
# transaction_processor = TransactionProcessor(db_session)
