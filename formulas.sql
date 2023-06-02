CREATE TABLE CloudEmissions (
    id INT PRIMARY KEY AUTO AUTO_INCREMENT,
    Provider VARCHAR(50),
    Region VARCHAR(50),
    Country VARCHAR(50),
    NERCRegion VARCHAR(50),
    CO2e DECIMAL(10, 3)
);

INSERT INTO
    CloudEmissions (Provider, Region, Country, NERCRegion, CO2e)
VALUES
    (
        'AWS',
        'us-east-1',
        'United States',
        'SERC',
        415.755
    ),
    (
        'AWS',
        'us-east-2',
        'United States',
        'RFC',
        440.187
    ),
    (
        'AWS',
        'us-west-1',
        'United States',
        'WECC',
        350.861
    ),
    (
        'AWS',
        'us-west-2',
        'United States',
        'WECC',
        350.861
    ),
    (
        'AWS',
        'us-gov-east-1',
        'United States',
        'SERC',
        415.755
    ),
    (
        'AWS',
        'us-gov-west-1',
        'United States',
        'WECC',
        350.861
    ),
    ('AWS', 'af-south-1', 'South Africa', '', 928.000),
    ('AWS', 'ap-east-1', 'Hong Kong', '', 810.000),
    ('AWS', 'ap-south-1', 'India', '', 708.000),
    ('AWS', 'ap-northeast-3', 'Japan', '', 506.000),
    (
        'AWS',
        'ap-northeast-2',
        'South Korea',
        '',
        500.000
    ),
    (
        'AWS',
        'ap-southeast-1',
        'Singapore',
        '',
        408.500
    ),
    (
        'AWS',
        'ap-southeast-2',
        'Australia',
        '',
        790.000
    ),
    ('AWS', 'ap-northeast-1', 'Japan', '', 506.000),
    ('AWS', 'ca-central-1', 'Canada', '', 130.000),
    ('AWS', 'cn-north-1', 'China', '', 555.000),
    ('AWS', 'cn-northwest-1', 'China', '', 555.000),
    ('AWS', 'eu-central-1', 'Germany', '', 338.000),
    ('AWS', 'eu-west-1', 'Ireland', '', 316.000),
    ('AWS', 'eu-west-2', 'England', '', 228.000),
    ('AWS', 'eu-south-1', 'Italy', '', 233.000),
    ('AWS', 'eu-west-3', 'France', '', 52.000),
    ('AWS', 'eu-north-1', 'Sweden', '', 8.000),
    ('AWS', 'me-south-1', 'Bahrain', '', 732.000),
    ('AWS', 'sa-east-1', 'Brazil', '', 74.000),
    (
        'Microsoft Azure',
        'Central US',
        'Iowa',
        'MRO',
        472.230
    ),
    (
        'Microsoft Azure',
        'East US',
        'Virginia',
        'SERC',
        415.755
    ),
    (
        'Microsoft Azure',
        'East US 2',
        'Virginia',
        'SERC',
        415.755
    ),
    (
        'Microsoft Azure',
        'East US 3',
        'Georgia',
        'SERC',
        415.755
    ),
    (
        'Microsoft Azure',
        'North Central US',
        'Illinois',
        'RFC',
        440.187
    ),
    (
        'Microsoft Azure',
        'South Central US',
        'Texas',
        'TRE',
        396.293
    ),
    (
        'Microsoft Azure',
        'West Central US',
        'Wyoming',
        'WECC',
        350,
    )
        ('GCP', 'us-central1', 'Iowa', '', 479.00),
        ('GCP', 'us-east1', 'South Carolina', '', 500.00),
        (
            'GCP',
            'us-east4',
            'Northern Virginia',
            '',
            383.00
        ),
        ('GCP', 'us-west1', 'Oregon', '', 117.00),
        ('GCP', 'us-west2', 'Los Angeles', '', 248.00),
        ('GCP', 'us-west3', 'Salt Lake City', '', 561.00),
        ('GCP', 'us-west4', 'Las Vegas', '', 491.00),
        ('GCP', 'asia-east1', 'Taiwan', '', 541.00),
        ('GCP', 'asia-east2', 'Hong Kong', '', 626.00),
        ('GCP', 'asia-northeast1', 'Japan', '', 524.00),
        ('GCP', 'asia-northeast2', 'Japan', '', 524.00),
        (
            'GCP',
            'asia-northeast3',
            'South Korea',
            '',
            540.00
        ),
        ('GCP', 'asia-south1', 'India', '', 723.00),
        (
            'GCP',
            'asia-southeast1',
            'Singapore',
            '',
            493.00
        ),
        (
            'GCP',
            'asia-southeast2',
            'Indonesia',
            '',
            772.00
        ),
        (
            'GCP',
            'australia-southeast1',
            'Australia',
            '',
            725.00
        ),
        ('GCP', 'europe-north1', 'Finland', '', 181.00),
        ('GCP', 'europe-west1', 'Belgium', '', 196.00),
        ('GCP', 'europe-west2', 'England', '', 257.00),
        ('GCP', 'europe-west3', 'Germany', '', 319.00),
        ('GCP', 'europe-west4', 'Netherlands', '', 474.00),
        ('GCP', 'europe-west6', 'Switzerland', '', 29.00),
        (
            'GCP',
            'northamerica-northeast1',
            'Canada',
            '',
            143.00
        ),
        (
            'GCP',
            'southamerica-east1',
            'Brazil',
            '',
            109.00
        );

CREATE TABLE PremiseEmissions (
    Country VARCHAR(50),
    State VARCHAR(50),
    Emissions DECIMAL(10, 1)
);

INSERT INTO
    PremiseEmissions (Country, State, Emissions)
VALUES
    ('Algeria', 'Algeria', 483.8),
    ('Andorra', 'Andorra', 474.8),
    ('Angola', 'Angola', 298.4),
    ('Argentina', 'Argentina', 287.2),
    ('Australia', 'Australia', 684.9),
    ('Austria', 'Austria', 135.9),
    ('Bangladesh', 'Bangladesh', 465.3),
    ('Barbados', 'Barbados', 474.8),
    ('Belgium', 'Belgium', 165.1),
    ('Bermuda', 'Bermuda', 474.8),
    ('Botswana', 'Botswana', 1258),
    ('Brazil', 'Brazil', 104.1),
    ('Brunei', 'Brunei', 685.4),
    ('Bulgaria', 'Bulgaria', 435.1),
    ('Canada', 'Alberta', 129.1),
    ('Canada', 'British Columbia', 129.1),
    ('Canada', 'New Brunswuik', 129.1),
    ('Canada', 'Ontario', 129.1),
    ('Canada', 'Quebec', 129.1),
    ('Canada', 'Nova Scotia', 129.1),
    ('Chile', 'Chile', 441.8),
    ('China/Hong Kong SAR', 'Hong Kong', 819),
    ('China/Mainland', 'China', 622.4),
    ('China/Taiwan', 'Taiwan', 553.9),
    ('Colombia', 'Colombia', 191.5),
    ('Costa Rica', 'Costa Rica', 5.9),
    ('Croatia', 'Croatia', 177.8),
    ('Czech Republic', 'Czech Republic', 440.8),
    ('Denmark', 'Denmark', 96.7),
    ('Egypt', 'Egypt', 503),
    ('Estonia', 'Estonia', 670.9),
    ('Finland', 'Finland', 92.1),
    ('France', 'France', 53.5),
    ('Germany', 'Germany', 344.5),
    ('Greece', 'Greece', 495.5),
    ('Hungary', 'Hungary', 227.2),
    ('India', 'India', 722.4),
    ('Indonesia', 'Indonesia', 761.7),
    ('Ireland', 'Ireland', 294.1),
    ('Israel', 'Israel', 478.3),
    ('Italy', 'Italy', 285),
    ('Japan', 'Japan', 486.7),
    ('Kazakhstan', 'Kazakhstan', 637.4),
    ('Kenya', 'Kenya', 106.9),
    ('Latvia', 'Latvia', 157),
    ('Lithuania', 'Lithuania', 65),
    ('Luxembourg', 'Luxembourg', 138),
    ('Malaysia', 'Malaysia', 662.1),
    ('Mauritius', 'Mauritius', 747.9),
    ('Mexico', 'Mexico', 397.2),
    ('Morocco', 'Morocco', 695.6),
    ('Mozambique', 'Mozambique', 84.9),
    ('Myanmar', 'Myanmar', 473.3),
    ('Netherlands', 'Netherlands', 368.1),
    ('New Zealand', 'New Zealand', 122.4),
    ('Nigeria', 'Nigeria', 409.5),
    ('Norway', 'Norway', 10.3),
    ('Peru', 'Peru', 201.5),
    ('Philippines', 'Philippines', 672),
    ('Poland', 'Poland', 664.6),
    ('Portugal', 'Portugal', 235.9),
    ('Puerto Rico', 'Puerto Rico', 729.600918),
    ('Qatar', 'Qatar', 478.8),
    ('Romania', 'Romania', 343.8),
    ('Russia', 'Russia', 374),
    ('Saudi Arabia', 'Saudi Arabia', 615.6),
    ('Singapore', 'Singapore', 385.2),
    ('Slovak Republic', 'Slovak Republic', 138),
    ('South Africa', 'South Africa', 931.9),
    ('South Korea', 'South Korea', 515.2),
    ('Spain', 'Spain', 198.3),
    ('Sweden', 'Sweden', 12.7),
    ('Switzerland', 'Switzerland', 23.8),
    ('Thailand', 'Thailand', 460.6),
    ('Turkey', 'Turkey', 431.3),
    ('Ukraine', 'Ukraine', 366.1),
    (
        'United Arab Emirates',
        'United Arab Emirates',
        504.6
    ),
    ('United Kingdom', 'United Kingdom', 208.4),
    ('United States', 'Alabama', 327.06614),
    ('United States', 'Arizona', 334.287779),
    ('United States', 'Arkansas', 431.496173),
    ('United States', 'California', 205.5307),
    ('United States', 'Colorado', 553.036149),
    ('United States', 'Connecticut', 240.297619),
    ('United States', 'Delaware', 342.475568),
    (
        'United States',
        'District Of Columbia',
        363.382077
    ),
    ('United States', 'Florida', 382.001121),
    ('United States', 'Georgia', 328.179709),
    ('United States', 'Idaho', 96.794718),
    ('United States', 'Illinois', 252.398547),
    ('United States', 'Indiana', 702.819485),
    ('United States', 'Iowa', 279.048891),
    ('United States', 'Kansas', 364.775511),
    ('United States', 'Kentucky', 764.245367),
    ('United States', 'Louisiana', 345.518263),
    ('United States', 'Maryland', 292.714257),
    ('United States', 'Massachusetts', 399.116054),
    ('United States', 'Michigan', 425.483357),
    ('United States', 'Minnesota', 349.431855),
    ('United States', 'Missouri', 734.102818),
    ('United States', 'New Jersey', 223.300166),
    ('United States', 'New Mexico', 571.468314),
    ('United States', 'New York', 189.009518),
    ('United States', 'North Carolina', 294.129464),
    ('United States', 'Ohio', 568.476875),
    ('United States', 'Oklahoma', 321.438878),
    ('United States', 'Oregon', 154.952017),
    ('United States', 'Pennsylvania', 316.392667),
    ('United States', 'Rhode Island', 375.374142),
    ('United States', 'South Carolina', 233.083239),
    ('United States', 'Tennessee', 259.185644),
    ('United States', 'Texas', 388.963758),
    ('United States', 'Utah', 710.21621),
    ('United States', 'Vermont', 13.748374),
    ('United States', 'Virginia', 292.496533),
    ('United States', 'Washington', 96.73938),
    ('United States', 'West Virginia', 873.043037),
    ('United States', 'Wisconsin', 540.687107),
    ('Venezuela', 'Venezuela', 313.8),
    ('Vietnam', 'Vietnam', 648.8);

CREATE TABLE CoeficientesCloud (
    proveedor VARCHAR(50),
    kvatios_min_cpu FLOAT,
    kvatios_max_cpu FLOAT,
    kvatios_min_gpu FLOAT,
    kvatios_max_gpu FLOAT,
    utilizacion_media FLOAT,
    coeficiente_hdd FLOAT,
    coeficiente_ssd FLOAT,
    coeficiente_memoria FLOAT,
    coeficiente_networking FLOAT,
    pue FLOAT
);

INSERT INTO
    CoeficientesCloud (
        proveedor,
        kvatios_min_cpu,
        kvatios_max_cpu,
        kvatios_min_gpu,
        kvatios_max_gpu,
        utilizacion_media,
        coeficiente_hdd,
        coeficiente_ssd,
        coeficiente_memoria,
        coeficiente_networking,
        pue
    )

VALUES
    (
        'AWS',
        0.00074,
        0.0035,
        0.02758,
        0.23950,
        0.5,
        0.00065,
        0.0012,
        0.000392,
        0.001,
        1.135
    ),
    (
        'GCP',
        0.00071,
        0.00426,
        0.02758,
        0.23950,
        0.5,
        0.00065,
        0.0012,
        0.000392,
        0.001,
        1.1
    ),
    (
        'Microsoft Azure',
        0.00078,
        0.00376,
        0.02758,
        0.23950,
        0.5,
        0.00065,
        0.0012,
        0.000392,
        0.001,
        1.125
    );