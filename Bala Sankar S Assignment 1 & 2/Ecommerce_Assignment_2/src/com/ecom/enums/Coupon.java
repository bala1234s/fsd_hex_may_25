package com.ecom.enums;

public enum Coupon {
	BLACK_FRIDAY(20),
	DIWALI(10),
	WELCOME(15),
	NEWYEAR(10);


Coupon (int discount){
	this.discount=discount;
}
private int discount;
public int getDiscount() {
	return discount;
}
	
}
