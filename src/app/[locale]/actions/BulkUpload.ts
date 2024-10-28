import { client } from "@/lib/sanity";

export const BulukUpload = async () => {
    const models = [
        // Electronics > Mobile Phones
        {
            title: { en: "iPhone 13", ar: "آيفون 13" },
            slug: { current: "iphone-13" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" }, // replace with actual subcategory ID
            description: "Apple's iPhone 13 smartphone."
        },
        {
            title: { en: "iPhone 14", ar: "آيفون 14" },
            slug: { current: "iphone-14" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Apple's iPhone 14 smartphone."
        },
        {
            title: { en: "iPhone SE", ar: "آيفون SE" },
            slug: { current: "iphone-se" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Apple's iPhone SE smartphone."
        },
        {
            title: { en: "iPhone 15", ar: "آيفون 15" },
            slug: { current: "iphone-15" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Apple's iPhone 15 smartphone."
        },
        {
            title: { en: "Samsung Galaxy S23", ar: "سامسونج جالكسي S23" },
            slug: { current: "samsung-galaxy-s23" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Samsung's Galaxy S23 smartphone."
        },
        {
            title: { en: "Samsung Galaxy Z Fold 5", ar: "سامسونج جالكسي Z Fold 5" },
            slug: { current: "samsung-galaxy-z-fold-5" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Samsung's Galaxy Z Fold 5 smartphone."
        },
        {
            title: { en: "Samsung Galaxy A54", ar: "سامسونج جالكسي A54" },
            slug: { current: "samsung-galaxy-a54" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Samsung's Galaxy A54 smartphone."
        },
        {
            title: { en: "Huawei P60 Pro", ar: "هواوي P60 Pro" },
            slug: { current: "huawei-p60-pro" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Huawei's P60 Pro smartphone."
        },
        {
            title: { en: "Huawei Mate X3", ar: "هواوي Mate X3" },
            slug: { current: "huawei-mate-x3" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Huawei's Mate X3 smartphone."
        },
        {
            title: { en: "Huawei Nova 10", ar: "هواوي Nova 10" },
            slug: { current: "huawei-nova-10" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Huawei's Nova 10 smartphone."
        },
        {
            title: { en: "Xiaomi Mi 13", ar: "شاومي Mi 13" },
            slug: { current: "xiaomi-mi-13" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Xiaomi's Mi 13 smartphone."
        },
        {
            title: { en: "Xiaomi Redmi Note 12", ar: "شاومي Redmi Note 12" },
            slug: { current: "xiaomi-redmi-note-12" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Xiaomi's Redmi Note 12 smartphone."
        },
        {
            title: { en: "Xiaomi Poco X5", ar: "شاومي Poco X5" },
            slug: { current: "xiaomi-poco-x5" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Xiaomi's Poco X5 smartphone."
        },
        {
            title: { en: "Oppo Reno 8", ar: "أوبو Reno 8" },
            slug: { current: "oppo-reno-8" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Oppo's Reno 8 smartphone."
        },
        {
            title: { en: "Oppo Find X6", ar: "أوبو Find X6" },
            slug: { current: "oppo-find-x6" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Oppo's Find X6 smartphone."
        },
        {
            title: { en: "Oppo A78", ar: "أوبو A78" },
            slug: { current: "oppo-a78" },
            subcategory: { _ref: "e33e9820-c65a-4de2-9244-f33dc4f6f27f" },
            description: "Oppo's A78 smartphone."
        },

        // Computers & Tablets
        {
            title: { en: "Dell XPS 13", ar: "ديل XPS 13" },
            slug: { current: "dell-xps-13" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "Dell's XPS 13 laptop."
        },
        {
            title: { en: "Dell Inspiron 15", ar: "ديل Inspiron 15" },
            slug: { current: "dell-inspiron-15" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "Dell's Inspiron 15 laptop."
        },
        {
            title: { en: "Dell Latitude 5420", ar: "ديل Latitude 5420" },
            slug: { current: "dell-latitude-5420" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "Dell's Latitude 5420 laptop."
        },
        {
            title: { en: "HP Pavilion x360", ar: "إتش بي Pavilion x360" },
            slug: { current: "hp-pavilion-x360" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "HP's Pavilion x360 laptop."
        },
        {
            title: { en: "HP Spectre x360", ar: "إتش بي Spectre x360" },
            slug: { current: "hp-spectre-x360" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "HP's Spectre x360 laptop."
        },
        {
            title: { en: "HP EliteBook 840", ar: "إتش بي EliteBook 840" },
            slug: { current: "hp-elitebook-840" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "HP's EliteBook 840 laptop."
        },
        {
            title: { en: "Lenovo ThinkPad X1 Carbon", ar: "لينوفو ThinkPad X1 Carbon" },
            slug: { current: "lenovo-thinkpad-x1-carbon" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "Lenovo's ThinkPad X1 Carbon laptop."
        },
        {
            title: { en: "Lenovo Yoga 9i", ar: "لينوفو Yoga 9i" },
            slug: { current: "lenovo-yoga-9i" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "Lenovo's Yoga 9i laptop."
        },
        {
            title: { en: "Lenovo IdeaPad 3", ar: "لينوفو IdeaPad 3" },
            slug: { current: "lenovo-ideapad-3" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "Lenovo's IdeaPad 3 laptop."
        },
        {
            title: { en: "Asus ZenBook 14", ar: "أسوس ZenBook 14" },
            slug: { current: "asus-zenbook-14" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "Asus's ZenBook 14 laptop."
        },
        {
            title: { en: "Asus ROG Zephyrus G14", ar: "أسوس ROG Zephyrus G14" },
            slug: { current: "asus-rog-zephyrus-g14" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "Asus's ROG Zephyrus G14 gaming laptop."
        },
        {
            title: { en: "Asus ROG Flow Z13", ar: "أسوس ROG Flow Z13" },
            slug: { current: "asus-rog-flow-z13" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "Asus's ROG Flow Z13 gaming tablet."
        },
        {
            title: { en: "Acer Swift 3", ar: "أيسر Swift 3" },
            slug: { current: "acer-swift-3" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "Acer's Swift 3 laptop."
        },
        {
            title: { en: "Acer Aspire 5", ar: "أيسر Aspire 5" },
            slug: { current: "acer-aspire-5" },
            subcategory: { _ref: "23d17d11-69eb-4eef-a274-2e65a78c5b98" },
            description: "Acer's Aspire 5 laptop."
        },

        // Trucks & Heavy Machinery
        {
            title: { en: "Caterpillar 320D", ar: "كاتربيلر 320D" },
            slug: { current: "caterpillar-320d" },
            subcategory: { _ref: "05b75343-afab-46fe-a613-edb6ec0d5f8f" }, // replace with actual subcategory ID
            description: "A powerful excavator designed for heavy-duty construction."
        },
        {
            title: { en: "Ford F-750", ar: "فورد F-750" },
            slug: { current: "ford-f-750" },
            subcategory: { _ref: "05b75343-afab-46fe-a613-edb6ec0d5f8f" }, // replace with actual subcategory ID
            description: "A versatile medium-duty truck suitable for various applications."
        },
        {
            title: { en: "Peterbilt 579", ar: "بيتر بيلت 579" },
            slug: { current: "peterbilt-579" },
            subcategory: { _ref: "05b75343-afab-46fe-a613-edb6ec0d5f8f" }, // replace with actual subcategory ID
            description: "A fuel-efficient long-haul truck with modern design."
        },
        {
            title: { en: "Mack Anthem", ar: "ماك أنثيم" },
            slug: { current: "mack-anthem" },
            subcategory: { _ref: "05b75343-afab-46fe-a613-edb6ec0d5f8f" }, // replace with actual subcategory ID
            description: "A heavy-duty truck known for its reliability and performance."
        },
        {
            title: { en: "Volvo FH16", ar: "فولفو FH16" },
            slug: { current: "volvo-fh16" },
            subcategory: { _ref: "05b75343-afab-46fe-a613-edb6ec0d5f8f" }, // replace with actual subcategory ID
            description: "A powerful truck designed for long-distance transportation."
        },
        {
            title: { en: "Komatsu D375A", ar: "كوماتسو D375A" },
            slug: { current: "komatsu-d375a" },
            subcategory: { _ref: "05b75343-afab-46fe-a613-edb6ec0d5f8f" }, // replace with actual subcategory ID
            description: "A bulldozer designed for heavy earthmoving tasks."
        },


        // Bicycles
        {
            title: { en: "Trek Domane SL 6", ar: "تريك دوماني SL 6" },
            slug: { current: "trek-domane-sl-6" },
            subcategory: { _ref: "2f866028-64b8-4037-b6f5-888e83a61454" }, // replace with actual subcategory ID
            description: "A road bike known for its comfort and speed."
        },
        {
            title: { en: "Giant Talon 3", ar: "جيانت تالون 3" },
            slug: { current: "giant-talon-3" },
            subcategory: { _ref: "2f866028-64b8-4037-b6f5-888e83a61454" }, // replace with actual subcategory ID
            description: "A versatile mountain bike suitable for trails."
        },
        {
            title: { en: "Specialized Allez", ar: "سبشاليزد أليز" },
            slug: { current: "specialized-allez" },
            subcategory: { _ref: "2f866028-64b8-4037-b6f5-888e83a61454" }, // replace with actual subcategory ID
            description: "A lightweight road bike designed for speed."
        },
        {
            title: { en: "Cannondale Quick 4", ar: "كانونديل كويك 4" },
            slug: { current: "cannondale-quick-4" },
            subcategory: { _ref: "2f866028-64b8-4037-b6f5-888e83a61454" }, // replace with actual subcategory ID
            description: "A fitness bike designed for quick rides."
        },
        {
            title: { en: "Bianchi Specialissima", ar: "بيانكي سبشاليزما" },
            slug: { current: "bianchi-specialissima" },
            subcategory: { _ref: "2f866028-64b8-4037-b6f5-888e83a61454" }, // replace with actual subcategory ID
            description: "An ultra-lightweight road bike for racing."
        },
        {
            title: { en: "Raleigh Retroglide", ar: "رايلي ريتروغلايد" },
            slug: { current: "raleigh-retroglide" },
            subcategory: { _ref: "2f866028-64b8-4037-b6f5-888e83a61454" }, // replace with actual subcategory ID
            description: "A classic cruiser bike with a vintage feel."
        },

        // Cars
        {
            title: { en: "Toyota Corolla", ar: "تويوتا كورولا" },
            slug: { current: "toyota-corolla" },
            subcategory: { _ref: "3243791e-8109-482c-a1a2-b9c399b72a11" }, // replace with actual subcategory ID
            description: "A reliable and fuel-efficient sedan from Toyota."
        },
        {
            title: { en: "Ford Mustang", ar: "فورد موستنج" },
            slug: { current: "ford-mustang" },
            subcategory: { _ref: "3243791e-8109-482c-a1a2-b9c399b72a11" }, // replace with actual subcategory ID
            description: "An iconic American muscle car with impressive performance."
        },
        {
            title: { en: "Honda Civic", ar: "هوندا سيفيك" },
            slug: { current: "honda-civic" },
            subcategory: { _ref: "3243791e-8109-482c-a1a2-b9c399b72a11" }, // replace with actual subcategory ID
            description: "A compact car known for its fuel efficiency and sporty design."
        },
        {
            title: { en: "Chevrolet Tahoe", ar: "شيفروليه تاهو" },
            slug: { current: "chevrolet-tahoe" },
            subcategory: { _ref: "3243791e-8109-482c-a1a2-b9c399b72a11" }, // replace with actual subcategory ID
            description: "A full-size SUV with ample space and capability."
        },
        {
            title: { en: "Tesla Model S", ar: "تسلا موديل S" },
            slug: { current: "tesla-model-s" },
            subcategory: { _ref: "3243791e-8109-482c-a1a2-b9c399b72a11" }, // replace with actual subcategory ID
            description: "A high-performance electric sedan with cutting-edge technology."
        },
        {
            title: { en: "Mercedes-Benz E-Class", ar: "مرسيدس-بنز E-Class" },
            slug: { current: "mercedes-benz-e-class" },
            subcategory: { _ref: "3243791e-8109-482c-a1a2-b9c399b72a11" }, // replace with actual subcategory ID
            description: "A luxury sedan known for its comfort and innovative features."
        },
        // Boats & Watercraft
        {
            title: { en: "Yamaha 242X", ar: "ياماها 242X" },
            slug: { current: "yamaha-242x" },
            subcategory: { _ref: "42490dae-ebc7-4772-ae01-d36bc744ad23" }, // replace with actual subcategory ID
            description: "A high-performance jet boat designed for water sports."
        },
        {
            title: { en: "Sea Ray SLX 400", ar: "سي راي SLX 400" },
            slug: { current: "sea-ray-slx-400" },
            subcategory: { _ref: "42490dae-ebc7-4772-ae01-d36bc744ad23" }, // replace with actual subcategory ID
            description: "A luxurious cruiser with advanced technology and comfort."
        },
        {
            title: { en: "Bayliner Element E18", ar: "بايلينر إلكمنت E18" },
            slug: { current: "bayliner-element-e18" },
            subcategory: { _ref: "42490dae-ebc7-4772-ae01-d36bc744ad23" }, // replace with actual subcategory ID
            description: "A versatile and affordable boat for family fun."
        },
        {
            title: { en: "Mastercraft NXT20", ar: "ماستر كرافت NXT20" },
            slug: { current: "mastercraft-nxt20" },
            subcategory: { _ref: "42490dae-ebc7-4772-ae01-d36bc744ad23" }, // replace with actual subcategory ID
            description: "A wakeboard boat designed for thrilling water sports."
        },
        {
            title: { en: "Boston Whaler 170 Montauk", ar: "بوسطن ويلر 170 مونتوك" },
            slug: { current: "boston-whaler-170-montauk" },
            subcategory: { _ref: "42490dae-ebc7-4772-ae01-d36bc744ad23" }, // replace with actual subcategory ID
            description: "A durable boat perfect for fishing and family outings."
        },
        {
            title: { en: "Sailboat Beneteau Oceanis 30.1", ar: "يخت بنيتو أوكيني 30.1" },
            slug: { current: "beneteau-oceanis-30-1" },
            subcategory: { _ref: "42490dae-ebc7-4772-ae01-d36bc744ad23" }, // replace with actual subcategory ID
            description: "A modern sailboat designed for comfortable cruising."
        },

        // Motorcycles
        {
            title: { en: "Harley-Davidson Softail", ar: "هارلي ديفيدسون سوفتيل" },
            slug: { current: "harley-davidson-softail" },
            subcategory: { _ref: "4784cdd6-29fb-4e4d-b66a-76a2fdcafe8a" }, // replace with actual subcategory ID
            description: "A classic cruiser with timeless styling and modern performance."
        },
        {
            title: { en: "Kawasaki Ninja ZX-10R", ar: "كاواساكي نينجا ZX-10R" },
            slug: { current: "kawasaki-ninja-zx-10r" },
            subcategory: { _ref: "4784cdd6-29fb-4e4d-b66a-76a2fdcafe8a" }, // replace with actual subcategory ID
            description: "A high-performance sportbike known for its speed and agility."
        },
        {
            title: { en: "Yamaha YZF-R1", ar: "ياماها YZF-R1" },
            slug: { current: "yamaha-yzf-r1" },
            subcategory: { _ref: "4784cdd6-29fb-4e4d-b66a-76a2fdcafe8a" }, // replace with actual subcategory ID
            description: "A flagship sportbike offering advanced technology and power."
        },
        {
            title: { en: "Honda CRF450R", ar: "هوندا CRF450R" },
            slug: { current: "honda-crf450r" },
            subcategory: { _ref: "4784cdd6-29fb-4e4d-b66a-76a2fdcafe8a" }, // replace with actual subcategory ID
            description: "A high-performance dirt bike designed for off-road racing."
        },
        {
            title: { en: "Ducati Monster 821", ar: "دوكاتي مونستر 821" },
            slug: { current: "ducati-monster-821" },
            subcategory: { _ref: "4784cdd6-29fb-4e4d-b66a-76a2fdcafe8a" }, // replace with actual subcategory ID
            description: "A naked bike with a blend of performance and style."
        },
        {
            title: { en: "BMW R1250GS", ar: "بي إم دبليو R1250GS" },
            slug: { current: "bmw-r1250gs" },
            subcategory: { _ref: "4784cdd6-29fb-4e4d-b66a-76a2fdcafe8a" }, // replace with actual subcategory ID
            description: "A versatile adventure bike designed for long-distance touring."
        }

        // Additional models can be added here...
    ];


    const transaction = client.transaction();

    models.forEach((model) => {
        transaction.create({
            _type: 'model',
            title: model.title,
            slug: model.slug,
            subcategory: model.subcategory,
            description: model.description,
        });
    });

    const result = await transaction.commit();
}