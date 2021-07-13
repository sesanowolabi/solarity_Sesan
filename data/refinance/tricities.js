var tricitiesRequest = {
      "borrowerInformation": { 
        "assetDocumentation": "Verified", 
        "debtToIncomeRatio": 15.0, 
        "pledgedAssets": false, 
        "citizenship": "USCitizen", 
        "employmentDocumentation": "Verified", 
        //UPDATE FICO
        "fico": 768, 
        "firstName": "test", 
        "lastName": "test1", 
        "vaFirstTimeUse": true, 
        // UPDATE FTHB
        "firstTimeHomeBuyer": true, 
        "incomeDocumentation": "Verified", 
        "monthlyIncome": 0.0, 
        "monthsReserves": 24, 
        "selfEmployed": true, 
        "waiveEscrows": false, 
        "mortgageLatesX30": 0, 
        "mortgageLatesX60": 0, 
        "mortgageLatesX90": 0, 
        "mortgageLatesX120": 0, 
        "mortgageLatesRolling": 0, 
        "bankruptcy": "Never", 
        "foreclosure": "Never", 
        "bankStatementsForIncome": "NotApplicable", 
        "state": "Washington" 
      }, 
      "loanInformation": { 
        "loanPurpose": "RefiRateTermLimitedCO", 
        "lienType": "First", 
        "amortizationTypes": [ 
          "Fixed",
          "ARM" 
        ], 
        "armFixedTerms": [ 
          "FiveYear",
          "SevenYear",
          "TenYear" 
        ], 
        "automatedUnderwritingSystem": "NotSpecified", 
        "borrowerPaidMI": "Yes", 
        "buydown": "None", 
        "cashOutAmount": 0.0, 
        "desiredLockPeriod": 0, 
        "desiredPrice": 0.0, 
        "desiredRate": 0.0, 
        "feesIn": "No", 
        "expandedApprovalLevel": "NotApplicable", 
        "fhaCaseAssigned": "2017-02-06T06:00:00+00:00", 
        "fhaCaseEndorsement": "2017-02-06T06:00:00+00:00", 
        "interestOnly": false, 
        // UPDATE BASE LOAN AMOUNT
        "baseLoanAmount": "269100.0",  
        "secondLienAmount": 0.0, 
        "helocDrawnAmount": 0.0, 
        "helocLineAmount": 0.0, 
        "loanTerms": [ 
          "FifteenYear",
          "TwentyYear",
          "ThirtyYear",
        ], 
        "loanType": "Conventional, NonConforming", 
        "prepaymentPenalty": "None", 
        "exemptFromVAFundingFee": false, 
        "includeLOCompensationInPricing": "YesLenderPaid", 
        "currentServicer": "ACH Trust", 
        "calculateTotalLoanAmount": true 
      }, 
      "propertyInformation": { 
      	// UPDATE APPRAISED VALUE
        "appraisedValue": "299000.0",  
        "occupancy": "PrimaryResidence", 
        "propertyStreetAddress": "string", 
        // UPDATE COUNTY
        "county": "Benton",
        "state": "WA",
        // UPDATE ZIPCODE  
        "zipCode": "99336",  
        "propertyType": "SingleFamily", 
        "corporateRelocation": false, 
        // UPDATE SALE PRICE
        "salesPrice": "299000.0", 
        "numberOfStories": 1, 
        "numberOfUnits": "OneUnit", 
        "construction": false 
      }, 
      // UPDATE CREDIT SCORE
      "representativeFICO": 768,  
      "loanLevelDebtToIncomeRatio": 18.0, 
      "customerInternalId": "OBSearch" 
    };



exports.tricitiesRequest = tricitiesRequest;