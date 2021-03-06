package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.entity.Supplier;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.repository.SupplierRepository;
import com.project.omega.service.interfaces.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private MessageSource messages;

    public Supplier addSupplier(Supplier supplier) {
        supplierRepository.save(supplier);
        return supplier;
    }

    public List<Supplier> getAllSuppliers() throws NoRecordsFoundException {
        List<Supplier> supplierCompanies = supplierRepository.findAll();
        if(supplierCompanies.isEmpty()) {
            throw new NoRecordsFoundException(messages.getMessage("message.noRecords", null, null));
        }
        return supplierCompanies;
    }

    public Supplier getSupplierById(Long id) throws NoRecordsFoundException {
        Optional<Supplier> supplier = supplierRepository.findById(id);
        if(!supplier.isPresent()) {
            throw new NoRecordsFoundException(messages.getMessage("message.supplierNotFound", null, null));
        }
        return supplier.get();
    }

    public Supplier getSupplierByName(String companyName) throws NoRecordsFoundException {
        Optional<Supplier> supplier = supplierRepository.findByCompanyName(companyName);
        if(!supplier.isPresent()) {
            throw new NoRecordsFoundException(messages.getMessage("message.supplierNotFound", null, null));
        }
        return supplier.get();
    }

    public Supplier updateSupplierById(Long id, Supplier supplierDetails) throws NoRecordsFoundException {
        Optional<Supplier> supplier = supplierRepository.findById(id);
        if(!supplier.isPresent()) {
            throw new NoRecordsFoundException(messages.getMessage("message.supplierNotFound", null, null));
        }
        supplierRepository.save(supplierDetails);
        return supplier.get();
    }

    public Supplier deleteSupplierById(Long id) throws NoRecordsFoundException {
        Optional<Supplier> supplier = supplierRepository.findById(id);
        if(!supplier.isPresent()) {
            throw new NoRecordsFoundException(messages.getMessage("message.supplierNotFound", null, null));
        }
        supplierRepository.deleteById(id);
        return supplier.get();
    }


}
