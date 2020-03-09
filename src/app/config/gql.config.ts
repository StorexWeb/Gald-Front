const SENT_PRACTICE_VIEW =  `
        _id
        user
        piva
        vehicle
        duration
        kilometres
        date
        delivery
        state
        product
        commission
        final_commission
        client
          offer {
            _id
            lessor_location
            processed
            idCasaLocatrice
        },
        finalDeal {
          _id 
        frame
        licensePlate
        sendingDate
        requestDate
        pendingRegistration
        registrationDate
        boardRequestDate
        requestMadeAvailable
        deliveryDate
        disCount
        note
        seller
        ownerHouse
        folderDeliveryDate
        },
        estimatedWithOffer
      `;


const ACCEPTED_ESTIMATE_VIEW = `
        _id
        user
        piva
        vehicle
        duration
        kilometres
        date
        delivery
        state
        product
        commission
        final_commission
        client
        offer {
            _id
            lessor_location
            processed
          idCasaLocatrice
        },
        finalDeal {
           _id 
        frame
        licensePlate
        sendingDate
        requestDate
        pendingRegistration
        registrationDate
        boardRequestDate
        requestMadeAvailable
        deliveryDate
        disCount
        note
        seller
        ownerHouse
        folderDeliveryDate
        },
        estimatedWithOffer
`;

const RECEIVED_PRACTICE_VIEW =  `
        _id
        client
        piva
        vehicle
        duration
        kilometres
        discount
        state
        commission
        user
        date
         offer {
            _id
            lessor_location
            processed
            idCasaLocatrice
        }, 
       finalDeal {
         _id 
        frame
        licensePlate
        sendingDate
        requestDate
        pendingRegistration
        registrationDate
        boardRequestDate
        requestMadeAvailable
        deliveryDate
        disCount
        note
        seller
        ownerHouse
        folderDeliveryDate
        },
        estimatedWithOffer
      `;


export const GQL = {

    RECEIVED_PRACTICE_PAGINATION: `
        practices { ${RECEIVED_PRACTICE_VIEW} } 
        n_practices
      `,

    SENT_PRACTICE_PAGINATION: `
        practices { ${SENT_PRACTICE_VIEW} } 
        n_practices
      `,
    ACCEPTED_ESTIMATE_PAGINATION: `
        practices { ${ACCEPTED_ESTIMATE_VIEW} } 
        n_practices
    `
};
