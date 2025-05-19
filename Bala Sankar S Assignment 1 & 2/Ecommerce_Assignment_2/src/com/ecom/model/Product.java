package com.ecom.model;

public class Product {
    
    private int id;
    private String name;
    private double price;
    private int category_id;
    private Category category; // Add category object

    public Product() {
    }

    public Product(int id, String name, double price, int category_id, Category category) {
        super();
        this.id = id;
        this.name = name;
        this.price = price;
        this.category_id = category_id;
        this.category = category;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public int getCategory_id() {
        return category_id;
    }
    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }

	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", price=" + price + ", category_id=" + category_id
				+ ", category=" + category + "]";
	}

    
}
