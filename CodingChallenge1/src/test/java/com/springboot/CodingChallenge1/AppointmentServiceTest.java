package com.springboot.CodingChallenge1;

import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.springboot.CodingChallenge1.dto.MedicalHistoryDto;
import com.springboot.CodingChallenge1.exception.PatientNotFoundException;
import com.springboot.CodingChallenge1.model.MedicalHistory;
import com.springboot.CodingChallenge1.model.Patient;
import com.springboot.CodingChallenge1.repository.MedicalHistoryRepository;
import com.springboot.CodingChallenge1.repository.PatientRepository;
import com.springboot.CodingChallenge1.service.MedicalHistoryService;
import com.springboot.CodingChallenge1.service.PatientService;

@SpringBootTest
public class AppointmentServiceTest {

	@InjectMocks
    private PatientService patientService;

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private MedicalHistoryRepository medicalHistoryRepository;
    
    @Mock
    private MedicalHistoryService medicalHistoryService;

    private Patient patient;
    private MedicalHistory history1, history2;

    @BeforeEach
    public void setup() {
        patient = new Patient();
        patient.setId(1);
        patient.setName("Alice");
        patient.setAge(25);

        history1 = new MedicalHistory();
        history1.setIllness("Diabetes");
        history1.setNumOfYears(3);
        history1.setCurrentMedication("Metformin");

        history2 = new MedicalHistory();
        history2.setIllness("Hypertension");
        history2.setNumOfYears(2);
        history2.setCurrentMedication("Amlodipine");
    }

    @Test
    public void testGetPatientWithHistory() {
        when(patientRepository.findById(1)).thenReturn(Optional.of(patient));
        when(medicalHistoryRepository.findByPatientId(1)).thenReturn(Arrays.asList(history1, history2));

        List<MedicalHistoryDto> result = medicalHistoryService.getPatientWithHistory(1);

        
        
        Assertions.assertEquals("Diabetes", result.get(0).getIllness());
        Assertions.assertEquals(3, result.get(0).getNumberOfYears());
       
    }

    
    
    
}
