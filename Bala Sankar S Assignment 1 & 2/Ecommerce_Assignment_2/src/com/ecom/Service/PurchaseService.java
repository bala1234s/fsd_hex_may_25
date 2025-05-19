package com.ecom.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;

import com.ecom.Dao.CustomerDao;
import com.ecom.Dao.ProductDao;
import com.ecom.Dao.PurchaseDao;
import com.ecom.Dao.Impl.CustomerDaoImpl;
import com.ecom.Dao.Impl.ProductDaoImpl;
import com.ecom.Dao.Impl.PurchaseDaoImpl;
import com.ecom.enums.Coupon;
import com.ecom.exception.InvalidIdException;
import com.ecom.model.Customer;
import com.ecom.model.Product;
import com.ecom.model.Purchase;

public class PurchaseService {

    CustomerDao customerdao = new CustomerDaoImpl();
    ProductDao productdao = new ProductDaoImpl();
    PurchaseDao purchasedao = new PurchaseDaoImpl();

    public void purchase(int id, int product_id, Scanner sc) throws InvalidIdException {
        // Validate ID
        if (id <= 0) {
            throw new InvalidIdException("Customer ID must be positive");
        }

        if (product_id <= 0) {
            throw new InvalidIdException("Product ID must be positive");
        }

        // Fetch customer and product
        Customer customer = customerdao.getByID(id);
        if (customer == null) {
            throw new InvalidIdException("No customer found with ID: " + id);
        }

        Product product = productdao.getById(product_id);
        if (product == null) {
            throw new InvalidIdException("No product found with ID: " + product_id);
        }

        // Set up purchase details
        Purchase purchase = new Purchase();
        purchase.setId(generateUniquePurchaseId());
        purchase.setCustomer(customer);
        purchase.setProduct(product);
        purchase.setCategory(product.getCategory());
        purchase.setPurchase_date(LocalDate.now());

        
        System.out.print("Do you have a coupon? (Y/N): ");
        String ans = sc.next();

        if (ans.equalsIgnoreCase("Y")) {
            System.out.print("Enter coupon code: ");
            String couponcode = sc.next().toUpperCase();

            try {
                Coupon coupon = Coupon.valueOf(couponcode);
                double discount = coupon.getDiscount();
                double discountedPrice = product.getPrice() - (product.getPrice() * discount / 100);
                System.out.println("Discount = " + discount + "%");
                System.out.println("Amount after discount = " + discountedPrice);
                purchase.setCoupon(coupon);
                purchase.setAmountPaid(discountedPrice);
            } catch (IllegalArgumentException e) {
                System.out.println("Invalid coupon code!");
                return;
            }
        } else if (ans.equalsIgnoreCase("N")) {
            System.out.println("No coupon applied.");
            purchase.setAmountPaid(product.getPrice());
        } else {
            System.out.println("Invalid input! Please enter Y or N.");
            return;
        }

        purchasedao.insert(purchase);
        System.out.println("Purchase successful! Purchase ID: " + purchase.getId());
    }

    private int generateUniquePurchaseId() {
        return (int) (Math.random() * 10000);
    }
}
