package com.ecom.controller;

import java.util.List;
import java.util.Scanner;

import com.ecom.Service.CategoryService;
import com.ecom.Service.CustomerService;
import com.ecom.Service.ProductService;
import com.ecom.Service.PurchaseService;
import com.ecom.exception.InvalidIdException;
import com.ecom.exception.InvalidInputException;
import com.ecom.model.Category;
import com.ecom.model.Customer;
import com.ecom.model.Product;

public class App {
public static void main(String[] args) {
	Scanner sc = new Scanner(System.in);
	CustomerService customerservice= new CustomerService();
	ProductService productservice = new ProductService();
	CategoryService categoryservice= new CategoryService();
	PurchaseService purchaseservice= new PurchaseService();
	Customer customer = new Customer();
	Product product= new Product();
	Category category=  new Category();
	while(true) {
		System.out.println("--------------ECOMMERCE MENU---------------");
		System.out.println("1.Add customer");
		System.out.println("2.Get all customer");
		System.out.println("3.Add Category");
		System.out.println("4.Add Product");
		System.out.println("5.Get Customer by ID");
		System.out.println("6.Get product by ID");
		System.out.println("7.get all category");
		System.out.println("8.Get all product");
		System.out.println("9.Get products by category");
		System.out.println("10.Purchase Product");
		System.out.println("0. Exit....");
		System.out.println("Enter your choice");
		int  choice=sc.nextInt();
		sc.nextLine();
		if(choice == 0) {
			System.out.println("Exiting... Thank you");
			break; //while loop breaks 
		}
		switch(choice) {
		case 1: //add customer
			System.out.println("Enter name:");
			customer.setName(sc.nextLine());
			
			System.out.println("Enter city: ");
			customer.setCity(sc.nextLine());
			System.out.println("Enter mobile:");
			customer.setMobile(sc.nextLine());
			System.out.println("Enter email:");
			customer.setEmail(sc.nextLine());
			try {
				customerservice.insert(customer);	
			}
			catch(InvalidInputException e) {
				System.out.println(e.getMessage());
			}
			System.out.println("Record Added to DB");
			break;
		case 2: // display all customers
			List<Customer> list =customerservice.getAll();
			list.stream().forEach(l-> System.out.println(l));
			break;
		case 3://add category
			System.out.println("Enter name:");
			category.setName(sc.nextLine());
			try {
				categoryservice.insert(category);
			} catch (InvalidInputException e) {
				System.out.println(e.getMessage());
			}
			System.out.println("Category Added...");
			break;
		case 4:
			//Add product
			System.out.println("Enter name:");
			product.setName(sc.nextLine());
			System.out.println("Enter price: ");
			product.setPrice(sc.nextDouble());
			System.out.println("Enter categoryID:");
			product.setCategory_id(sc.nextInt());
			try {
				productservice.insert(product);
			} catch (InvalidInputException e) {
				System.out.println(e.getMessage());
			}
			System.out.println("Product Added...");
			
			break;
		case 5:
			System.out.println("Enter CustomerID:");
			int id=sc.nextInt();
			try {
				Customer customer1=customerservice.getById(id);
				 if (customer1==null) {
			            System.out.println("No customer found in this ID.");
			        } else {
			        	System.out.println("ID: " + customer1.getId()
		                + ", Name: " + customer1.getName()
		                + ", City: " + customer1.getCity()
		                + ", Mobile: " + customer1.getMobile()
		                + ", Email: " + customer1.getEmail());}
			            
			        	
			        }
			 catch (InvalidIdException e) {
				System.out.println(e.getMessage());
			}
			break;
		case 6:System.out.println("Enter Product_id:");
		int p_id=sc.nextInt();
		try {
			Product product1=productservice.getById(p_id);
			 if (product1==null) {
		            System.out.println("No product found in this ID.");
		        } else {
		        	System.out.println("ID: " + product1.getId()
	                + ", Name: " + product1.getName()
	                + ", Price: " + product1.getPrice()
	                + ", Category ID: " + product1.getCategory_id());
		            }
		        	
		        }
		 catch (InvalidIdException e) {
			System.out.println(e.getMessage());
		}
			break;
			
		case 7:List<Category> list1 =categoryservice.getAll();
		list1.stream().forEach(l-> System.out.println(l));
			break;
		case 8:
			List<Product> list2 =productservice.getAll();
			list2.stream().forEach(l-> System.out.println(l));
			break;
		case 9:
			System.out.println("Enter Category_id:");
			int category_id=sc.nextInt();
			product.setCategory_id(category_id);
			try {
				List<Product> products=productservice.getByCategoryId(category_id, product);
				 if (products.isEmpty()) {
			            System.out.println("No products found in this category.");
			        } else {
			        	for (Product p : products) {
			                System.out.println("ID: " + p.getId() + ", Name: " + p.getName() + ", Price: " + p.getPrice());
			            }
			        	
			        }
			} catch (InvalidIdException e) {
				System.out.println(e.getMessage());
			}
			break;
		case 10:
			System.out.print("Enter customer ID: ");
		    int customer_id = sc.nextInt();
		    System.out.print("Enter product ID: ");
		    int product_id = sc.nextInt();
		    try {
		        purchaseservice.purchase(customer_id,  product_id,sc);
		        System.out.println("Customer Purchased a product");
		    } catch (InvalidIdException e) {
		        System.out.println("Purchase failed: " + e.getMessage());
		    }
			catch(IllegalArgumentException e) {
				System.out.println("Coupon code is Invalid!!");}
					break;
		default:
			System.out.println("Invalid Input..");
			break;
		}
	}
}
}
