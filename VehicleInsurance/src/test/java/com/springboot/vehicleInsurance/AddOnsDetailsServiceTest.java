package com.springboot.vehicleInsurance;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Optional;

import com.springboot.vehicleInsurance.model.AddOnsDetails;
import com.springboot.vehicleInsurance.repository.AddOnsDetailsRepository;
import com.springboot.vehicleInsurance.service.AddOnsDetailsService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AddOnsDetailsServiceTest {

    @InjectMocks
    private AddOnsDetailsService addOnsService;

    @Mock
    private AddOnsDetailsRepository addOnsRepo;

    private AddOnsDetails addOn;

    @BeforeEach
    public void init() {
        addOn = new AddOnsDetails();
        addOn.setId(1);
        addOn.setName("Engine Cover");
        addOn.setDescription("Covers engine damages");
        addOn.setPrice(1200);
        System.out.println("AddOnsDetails object initialized");
    }

    @Test
    public void getAddOnTest() {
        when(addOnsRepo.findById(1)).thenReturn(Optional.of(addOn));
        when(addOnsRepo.save(addOn)).thenReturn(addOn); 

        AddOnsDetails result = addOnsService.updateAddOn(1, addOn);

        assertEquals(addOn, result);
    }


    public void afterEach() {
        addOn = null;
        System.out.println("AddOnsDetails is null");
    }
}
