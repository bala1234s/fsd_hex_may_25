package com.springboot.vehicleInsurance.dto;

import java.util.List;

import org.springframework.stereotype.Component;

import com.springboot.vehicleInsurance.model.AddOns;
import com.springboot.vehicleInsurance.model.PolicyHolder;

@Component
public class PolicyHolderRequest {
    private PolicyHolder holder;
    private List<AddOns> addOns;

    public PolicyHolder getHolder() {
        return holder;
    }

    public void setHolder(PolicyHolder holder) {
        this.holder = holder;
    }

    public List<AddOns> getAddOns() {
        return addOns;
    }

    public void setAddOns(List<AddOns> addOns) {
        this.addOns = addOns;
    }
}
