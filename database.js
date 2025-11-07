// --- database.js (ĐỊNH DẠNG MẢNG 20 SẢN PHẨM) ---

// BƯỚC 1: ĐỊNH NGHĨA TẤT CẢ CÁC HẰNG SỐ (KEY)
const USER_DATA_KEY = 'sgu_admin_users';
const PRODUCT_DATA_KEY = 'sgu_admin_products';
const CATEGORY_DATA_KEY = 'sgu_admin_categories';
const IMPORT_DATA_KEY = 'sgu_admin_imports';
const ORDER_DATA_KEY = 'sgu_admin_orders'

// BƯỚC 2: ĐỊNH NGHĨA TẤT CẢ DỮ LIỆU MẪU

// --- Dữ liệu User ---
const DEFAULT_USERS = [
    { id: 1, username: 'NhâtAn', password: '12345678', isLocked: false },
    { id: 2, username: 'Nam', password: '12345678', isLocked: false },
    { id: 3, username: 'Vu', password: '12345678', isLocked: true }
];

// --- Dữ liệu Category ---
const DEFAULT_CATEGORIES = [
    { id: 1, name: 'Sách Giáo Khoa', description: 'Sách dùng cho học tập tại trường.' },
    { id: 2, name: 'Sách Trinh Thám', description: 'Truyện trinh thám, phá án.' },
    { id: 3, name: 'Sách Kỹ Năng', description: 'Sách phát triển bản thân.' },
    { id: 4, name: 'Tâm Lý - Kỹ Năng Sống', description: 'Sách tâm lý và kỹ năng.' },
    { id: 5, name: 'Sách Tiếng Việt', description: 'Sách văn học Việt Nam.' },
    { id: 6, name: 'Manga - Comic', description: 'Truyện tranh.' },
    { id: 7, name: 'Sách Kinh Tế', description: 'Sách về kinh tế, kinh doanh.' },
    { id: 8, name: 'Fiction - Thriller', description: 'Tiểu thuyết nước ngoài.' },
    { id: 9, name: 'Sách Tiếng Anh', description: 'Sách học ngoại ngữ.' },
    { id: 10, name: 'Chính Trị - Pháp Luật', description: 'Sách về chính trị.' },
    { id: 11, name: 'Sách Thiếu Nhi', description: 'Sách cho trẻ em.' },
    { id: 12, name: 'Văn Học', description: 'Sách văn học.' },
    { id: 13, name: 'Sách Tin Học - Công Nghệ', description: 'Sách về lập trình.' },
    { id: 14, name: 'Tiểu Thuyết', description: 'Tiểu thuyết lãng mạn, phiêu lưu.' }
];

// --- Dữ liệu Product (ĐỊNH NGHĨA LÀ MỘT MẢNG) ---
const DEFAULT_PRODUCTS = [
    // Sản phẩm 1 ("01")
    {
        id: "01",
        title: "Lớp Học Tâm Lý Cho Người Hướng Nội",
        supplier: "AZ Việt Nam",
        category: "Tâm Lý - Kỹ Năng Sống",
        author: "Jaehoon Choi",
        publisher: "Dân Trí", 
        binding: "Bìa Mềm",
        reviewCount: 0,
        // stock: 0,
        // soldCount: 0, 
        currentPrice: 85000, 
        oldPrice: 95000, 
        discount: 10, 
        mainImage: "../img/mockup_3d_-_l_p_h_c_t_m_l_cho_ng_i_h_ng_n_i.png",
        thumbnails: [
            "../img/b_a_1_-_l_p_h_c_t_m_l_cho_ng_i_h_ng_n_i.png",
            "../img/b_a_4_-_l_p_h_c_t_m_l_cho_ng_i_h_ng_n_i.png",
        ],
        sku: "9798217091256",
        releaseDate: "20/11/2025",
        year: 2023,
        pages: 296,
        description: `<p>Không thể phủ nhận rằng người hướng ngoại có ưu thế vượt trội...</p>` // (Hãy dán description đầy đủ của bạn vào đây)
    },
    // Sản phẩm 2 ("02")
    {
        id: "02",
        title: "Chúng Ta Ai Chẳng Có Lúc Phát Điên",
        supplier: "AZ Việt Nam",
        category: "Tâm Lý - Kỹ Năng Sống",
        author: "Jeong Jeeumm",
        publisher: "Dân Trí",
        binding: "Bìa Mềm",
        reviewCount: 150,
        // soldCount: 0,
        currentPrice: 82000,
        // stock: 0,
        oldPrice: 87000,
        discount: 5,
        mainImage: "../img/chung-ta-ai-chang-co-luc-phat-dien-5.jpg",
        thumbnails: [
            "../img/chung-ta-ai-chang-co-luc-phat-dien.jpg",
            "../img/chung-ta-ai-chang-co-luc-phat-dien-2.jpg"
        ],
        sku: "8935325020902",
        releaseDate: "02/12/2025",
        year: 2025,
        pages: 172,
        description: `<p><strong>"Chúng ta ai chẳng có lúc phát điên"</strong>...</p>` // (Hãy dán description đầy đủ của bạn vào đây)
    },
    
    {
        id: "03",
        title: "The Alchemist's Secret",
        supplier: "Usborne",
        category: " Fiction - Thriller",
        author: "Scott Mariani",
        publisher: "Avon",
        binding: "Bìa Mềm",
        reviewCount: 100,
        // soldCount: 0,
        currentPrice: 194000,
        // stock: 0,
        oldPrice: 238000,
        discount:  18.49,
        mainImage: "../img/the-alchemist-s-secret-the-gripping-historical-action-thriller-from-the-sunday-times-bestselling-author-ben-hope-book-1.jpg",
        thumbnails: [
            "../img/3084415.jpg"
        ],
        sku: "9781847563408",
        releaseDate: "04/06/2011",
        year: 2011,
        pages: 496,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>The Alchemist's Secret</h2>
            <p>THE #1 SUNDAY TIMES BESTSELLER <br>Introducing the explosive first Ben Hope adventure</p>
            <p>‘James Bond meets Jason Bourne meets The Da Vinci Code’ J. L. Carrell</p>
            <p>Ben Hope lives on the edge. A former elite member of the SAS, Ben is tortured by a tragedy from his past and now devotes his life to finding kidnapped children.</p>
            <p>When Ben is recruited to locate an ancient manuscript which could save a dying child, he embarks on the deadliest quest of his life.</p>
            <p>The document is alleged to contain the formula for the elixir of life, discovered by the brilliant alchemist Fulcanelli decades before. But it soon becomes apparent that others are hunting this most precious of treasures – for far more evil ends.</p>
            <p>When the secrets of alchemy hidden within the pages remain impenetrable, Ben teams up with beautiful American scientist Dr Roberta Ryder to crack the code.</p>
            <p>It seems that everyone – from the Nazis during WW2 and powerful Catholic organisation Gladius Domini – wants to unearth the secrets of immortality.</p>
            <p>The trail leads Ben and Roberta from Paris to the ancient Cathar strongholds of the Languedoc, where an astonishing secret has lain hidden for centuries…</p>
            <p>The Ben Hope series is a must-read for fans of Dan Brown, Lee Child and Mark Dawson. Join the millions of readers who get breathless with anticipation when the countdown to the new Ben Hope thriller begins…</p>
        `
    },

    {
        id: "04",
        title: "Sapiens Lược Sử Loài Người",
        supplier: "Alpha Books",
        category: "Sách Tiếng Việt",
        author: "Yuval Noah Harari",
        publisher: "Tri Thức",
        binding: "Bìa Mềm",
        reviewCount: 0,
        // soldCount: 0,
        currentPrice: 254000,
        // stock: 0,
        oldPrice: 299000,
        discount: 15,
        mainImage: "../img/160fe47458e1d77cd11be085ac85e170.jpg",
        thumbnails: [
            "../img/20211130_QWMgEzofkaOBZwl0o8WXSCOD.jpg",
            "../img/z2951997492933-bee84609acfb6317e48fd15307f7336d-922.jpg"
        ],
        sku: "8935270703554",
        releaseDate: "15/01/2022",
        year: 2022,
        pages: 566,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <p><strong>"Sapiens Lược Sử Loài Người"</strong>
            <p>Sapiens là một câu chuyện lịch sử lớn về nền văn minh nhân loại – cách chúng ta phát triển từ xã hội săn bắt hái lượm thuở sơ khai đến cách chúng ta tổ chức xã hội và nền kinh tế ngày nay.</p>
            <p>Trong ấn bản mới này của cuốn Sapiens - Lược sử loài người, chúng tôi đã có một số hiệu chỉnh về nội dung với sự tham gia, đóng góp của các thành viên Cộng đồng đọc sách Tinh hoa. Xin trân trọng cảm ơn ý kiến đóng góp tận tâm của các quý độc giả, đặc biệt là ông Nguyễn Hoàng Giang, ông Nguyễn Việt Long, ông Đặng Trọng Hiếu cùng những người khác. Mong tiếp tục nhận được sự quan tâm và góp ý từ độc giả.</p>
            <p><strong>Review sách:</strong></p>
            <p>Điểm độc đáo ở Harari là ông tập trung vào sức mạnh của câu chuyện và huyền thoại để đưa mọi người lại gần nhau... Tôi muốn giới thiệu cuốn sách này cho bất cứ ai hứng thú quan tâm tới một cách nhìn đầy hấp dẫn và thú vị về lịch sử ban đầu của con người... Harari kể về lịch sử loài người theo một cách dễ tiếp cận khiến bạn thật khó có thể đặt nó xuống”.</p>
        `
    },

    {
        id: "05",
        title: "Hoàng Đế Xứ Gladness",
        supplier: "Nhã Nam",
        category: "Sách Tiếng Việt",
        author: "Ocean Vuong",
        publisher: "Hội Nhà Văn",
        binding: "Bìa Mềm",
        reviewCount: 0,
        // soldCount: 0,
        currentPrice: 188000,
        // stock: 0,
        oldPrice: 250000,
        discount: 24,
        mainImage: "../img/capture_91bced52e3a84cbcbef35a5aad54c64f_grande.jpg",
        thumbnails: [
            "../img/hoang-de-xu-gladness-khi-ocean-vuong-khao-sat-ve-gia-dinh-va-cai-chet-20251002-dnplus-1024x760.jpg",
            "../img/2-Cuon-Ocean-Vuong-0.jpg"
        ],
        sku: "8935235245242",
        releaseDate: "10/03/2025",
        year: 2025,
        pages: 564,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>Hoàng Đế Xứ Gladness</h2>
            <p>Thế gian này khó nhất là chỉ sống một lần.</p>
            <p>Vào một chiều mưa rào cuối hạ, Hải đứng trên mép cây cầu đường sắt dẫn ra khỏi thị trấn với ý định nhảy xuống dòng sông cuộn chảy bên dưới. Song hành động của cậu bị một cụ bà sống đơn thân bên bờ sông nhìn thấy và ngăn cản. Vì không còn đường nào để đi, cậu trở thành người chăm sóc tại nhà cho bà. Và cuộc gặp gỡ định mệnh ấy đã kết nối hai con người thuộc hai thế hệ đó, để mỗi người, bằng tình thương và sự thấu cảm, trở thành chỗ dựa cho nhau trong những tháng ngày về sau.</p>
            <p>Chân thành, cảm động và giàu chất thơ, Hoàng đế xứ Glasnet đánh dấu sự trở lại với tiểu thuyết của Ocean Vuong, với những chiêm nghiệm và quan sát của anh về đời sống của những người lao động chân phương, của những mảnh đời nằm bên lề xã hội. Một câu chuyện về nỗi cô đơn, dằn vặt và những tổn thương quá khứ. Nhưng trên hết, nó là bản tụng ca về nỗ lực vươn lên và ý chí sống mãnh liệt của mỗi con người.</p>
            `
    },
    
    {
        id: "06",
        title: "Một Đời Thương Thuyết (Tái Bản 2020)",
        supplier: "NXB Trẻ",
        category: "Tâm Lý - Kỹ Năng Sống",
        author: "Phan Văn Trường",
        publisher: "NXB Trẻ",
        binding: "Bìa Mềm",
        reviewCount: 4,
        // soldCount: 0,
        currentPrice: 114500,
        // stock: 0,
        oldPrice: 135000,
        discount: 15,
        mainImage: "../img/aec5ea1cfd2afdae86127d39984934fa.jpg",
        thumbnails: [
            "../img/aec5ea1cfd2afdae86127d39984934fa.jpg"
        ],
        sku: "8934974164616",
        releaseDate: "02/10/2020",
        year: 2020,
        pages: 336,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <p>Hơn 40 năm kinh nghiệm trong nghề và cả nghiệp thương thuyết, Giáo sư Phan Văn Trường, Cố vấn thương mại quốc tế của chính phủ Pháp, có lẽ đã cố gắng thể hiện gần trọn vẹn trong cuốn sách này. Được viết từ trải nghiệm của một người thường xuyên “xông pha trận mạc” đàm phán, thật khó có thể tìm được cuốn sách nào khác về đề tài này mang tính thực tế cao hơn Một đời thương thuyết. Trong đó không có những bài lý thuyết theo lớp lang chuẩn mực, nhưng độc giả sẽ được “sống” thực sự trong từng bối cảnh đàm phán như đang diễn ra trước mắt. Và độc giả sẽ đọc cuốn sách này chẳng khác gì đang đọc một tập truyện ngắn đầy những tình tiết thú vị.</p>    
        `
    },

    {
        id: "07",
        title: "12 Quy Luật Cuộc Đời: Thần Dược Cho Cuộc Sống Hiện Đại",
        supplier: "Saigon Books",
        category: "Tâm Lý - Kỹ Năng Sống",
        author: "Jordan B Peterson",
        publisher: "NXB Thế Giới",
        binding: "Bìa Mềm",
        reviewCount: 0,
        // soldCount: 0,
        currentPrice: 240000,
        // stock: 0,
        oldPrice: 300000,
        discount: 20,
        mainImage: "../img/1642306000_7649_12-quy-luat-cuoc-doi-than-duoc-cho-cuoc-song-hien-dai.jpg",
        thumbnails: [
            "../img/030167810fc6c56170b52bc628600aff.jpg",
            "../img/976ed0ab2c49049e48a77e8377751a4e.jpg_720x720q80.jpg"
        ],
        sku: "8935278602156",
        releaseDate: "01/08/2020",
        year: 2020,
        pages: 496,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <p><strong>12 QUY LUẬT CUỘC ĐỜI:</strong></p>
            <p><strong>“THẦN DƯỢC” NÀO CHO CUỘC SỐNG CỦA CHÚNG TA?</strong></p>
            <p>Nếu được hỏi chính mình một câu thật thẳng thắn thì chắc chắn chúng ta sẽ muốn bắt đầu bằng câu hỏi này: “Tại sao cuộc sống lại xấu xa, nặng nề và mệt mỏi đến thế?”</p>
            <p>Chẳng phải là mọi lúc, mọi nơi, nhưng đấy là câu hỏi vẫn đeo đẳng mỗi chúng ta; có lúc nó như động cơ thôi thúc chúng ta sống, sống để tìm ra câu trả lời cuối cùng; có lúc nó như hòn đá tảng cản đường, như muốn lấy nốt đi của chúng ta chút ý chí cuối cùng, khiến chúng ta muốn hủy hoại cuộc sống của mình. Cứ thế cho đến tận cùng. “Mọi người đều hành động như thể nỗi đau của họ là có thật – để rồi sau cùng nó là thật. Nỗi đau quan trọng hơn cả những vấn đề vật chất.”</p>
            <p>Có cách nào không, để mỗi chúng ta tìm thấy được ý nghĩa của cuộc sống và vượt qua được những xấu xa, nặng nề và mệt mỏi của nó mà sống một cuộc đời an vui? Rất nhiều người đi tìm câu trả lời, tìm trong triết học, tìm trong khoa học, tìm trong văn chương và nghệ thuật; và cho dù đã có rất nhiều câu trả lời được công bố bằng cách này hay cách khác, thì dường như điểm chung của chúng đều nằm ở kết luận rằng: Chúng ta mệt mỏi với cuộc sống là vì đã sống sai ở đâu đó; để tốt đẹp và thoải mái hơn, hãy biết tuân theo các quy luật!</p>
            <p><strong>“12 Quy luật cuộc đời: Thần dược cho cuộc sống hiện đại”</strong> của Jordan B. Peterson chính là cuốn sách đưa ra những quy luật ấy, giúp chúng ta tìm thấy ý nghĩa cuộc sống và sống một cuộc đời an vui hơn.</p>
        `
    },

    {
        id: "08",
        title: "English Grammar In Use With Answer And Interactive E-book",
        supplier: "Cambridge University Press",
        category: "Sách Tiếng Anh",
        author: "Raymond Murphy",
        publisher: "Cambridge University",
        binding: "Bìa Mềm",
        reviewCount: 0,
        // soldCount: 0,
        currentPrice: 356000,
        // stock: 0,
        oldPrice: 375000,
        discount: 5,
        mainImage: "../img/1507-1.jpg",
        thumbnails: [
            "../img/1507-1.jpg",
            "../img/1520-2.jpg"
        ],
        sku: "9781009826464",
        releaseDate: "10/03/2025",
        year: 2025,
        pages: 880,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>English Grammar In Use With Answer And Interactive E-book</h2>
            <p>Raymond Murphy's English Grammar in Use is the first choice for intermediate (B1 B2) learners and covers all the grammar you will need at this level. This book has clear explanations and practice exercises that have helped millions of people around the world improve their English. It also includes an interactive ebook with audio that you can use online or download to your iPad or Android tablet. It is perfect for self study and can also be used by teachers as a supplementary book in classrooms.</p>
        `
    },

    {
        id: "09",
        title: "17 Âm 1",
        supplier: "CÔNG TY CỔ PHẦN VĂN HÓA VÀ TRUYỀN THÔNG NHÃ NAM",
        author: "Doo Vandenis",
        category: "Manga - Comic",
        publisher: "Thanh Niên",
        binding: "Bìa Mềm",
        reviewCount: 30 ,
        // soldCount: 0,
        currentPrice: 135000,
        // stock: 0,
        oldPrice: 169000,
        discount: 20,
        mainImage: "../img/200238571.jpg",
        thumbnails: [
            "../img/vn-11134208-7r98o-lo6c8kwm1zw747.jpg",
            "../img/200238571.jpg"
        ],
        sku: "9780747532747",
        releaseDate: "10/03/2025",
        year: 2025,
        pages: 180,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>17 Âm 1</h2>
            <p>Vụ án bắt đầu ở hồ An Yên, và cũng kết thúc tại nơi nạn nhân bỏ mạng.</p>
            <p>Không phải ngẫu nhiên mà lớp 12D4 trường THPT NTX luôn có một học sinh vắng nhưng toàn bộ thành viên đều từ chối đề cập đến chuyện đó. Bởi vì mọi người đều biết người bạn ấy đã chết, chết không toàn thây.</p>
            <p>Không phải tình cờ mà Duy Lâm trở thành thành viên trong lớp nhận nhiệm vụ phải đi tìm lại cái xác và trả về hồ An Yên. Nhiệm vụ ấy không đáng sợ vì phải đụng chạm xác người chết, mà nó đáng sợ vì cậu ta phải đối mặt với những người xử lý cũng như các thực thể không thật được tạo ra bởi tâm lý méo mó của họ.</p>
            <p>Mỗi lần mảnh xác được trả về hồ An Yên, bản chất của vụ án lại được tiết lộ.</p>
            <p>Chặng đường này không thể trông chờ vào may mắn để đến được điểm cuối. Bởi vì muốn lừa được kẻ phạm tội tiết lộ chỗ giấu xác, cậu buộc phải đẩy bản thân mình vào thế hiểm nguy.</p>
        `
    },

    {
        id: "10",
        title: "Hồ Chí Minh – Một Con Người Và Một Dân Tộc",
        supplier: "Nhà Xuất Bản Kim Đồng",
        category: "Sách Tiếng Việt",
        author: "Paolo Bracaglia Morante, Camillo Pisani, Pino Dangelico",
        publisher: "Kim Đồng",
        binding: "Bìa Cứng",
        reviewCount: 274,
        // soldCount: 0,
        currentPrice: 315000,
        // stock: 0,
        oldPrice: 350000,
        discount: 10,
        mainImage: "../img/ho-chi-minh_mot-con-nguoi-va-mot-dan-toc_bia_1dd8549c8886401e849bc2149d9326ad.png",
        thumbnails: [
            "../img/ho-chi-minh_mot-con-nguoi-va-mot-dan-toc_bia_1dd8549c8886401e849bc2149d9326ad.png",
            "../img/ho-chi-minh_mot-con-nguoi-va-mot-dan-toc_07_9e67399a1d9d4750b8f7fbaf18fb862e_master.png",
            "../img/ho-chi-minh_mot-con-nguoi-va-mot-dan-toc_08_5afca1f3bf804bc28f41d2425835a57f_master.png",
        ],
        sku: "9786042253437",
        releaseDate: "29/05/2025",
        year: 2025,
        pages: 204,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <p><strong>Hồ Chí Minh – Một Con Người Và Một Dân Tộc</strong></p>
            <p>Cách đây 57 năm ở đất nước Italia xa xôi, một cuốn sách về Hồ Chí Minh và hai cuộc kháng chiến vĩ đại của nhân dân Việt Nam đã được ra đời. Cuốn sách đó là “Ho Ci Min – Un uomo e un popolo” do tạp chí Vie Nuove, lúc bấy giờ là cơ quan ngôn luận của Đảng Cộng sản Italia, phát hành.</p>
            <p>Năm 2020, ấn phẩm đặc biệt này đã được Chi hội Hữu nghị Italia - Việt Nam vùng Veneto trao tặng cho Bảo tàng Hồ Chí Minh và sau đó được Hội Hữu nghị Việt Nam - Italia giới thiệu tới chúng tôi. Nhân dịp kỷ niệm 135 năm ngày sinh Chủ tịch Hồ Chí Minh, cuốn sách đã được chuyển ngữ và ra mắt với tên gọi “Hồ Chí Minh – Một con người và một dân tộc”. Vậy là sau gần 60 năm, ấn phẩm này được quay lại nơi đã truyền cảm hứng cho 3 tác giả người Italia là nhà báo Paolo Bracaglia Morante, nhà báo Camillo Pisani và hoạ sĩ Pino Dangelico. Với tâm huyết của các tác giả, cuốn sách là ấn phẩm hiếm hoi đề cập câu chuyện về cuộc đời của Chủ tịch Hồ Chí Minh một cách có hệ thống dưới dạng sách tranh (gồm cả hình vẽ minh hoạ lẫn ảnh tư liệu) từ khi Người còn nhỏ cho đến khi ra đi tìm đường cứu nước, và công cuộc đấu tranh vì sự nghiệp giải phóng dân tộc của nhân dân Việt Nam cũng như các dân tộc bị áp bức trên toàn thế giới.</p>
            <p>Phó giáo sư, Tiến sĩ Đinh Quang Hải – một trong những chuyên gia hiệu đính cho “Hồ Chí Minh – Một con người và một dân tộc” chia sẻ: “Cuốn sách này có tính mới, cách tiếp cận mới, cơ sở dữ liệu mới với nguồn tài liệu phong phú, đa dạng, có độ tin cậy. Cuốn sách được nghiên cứu, biên soạn và cách thể hiện rất công phu, nghiêm túc, có chất lượng tốt. Tôi đánh giá rất cao giá trị của cuốn sách, nhất là trong việc giáo dục cho thế hệ trẻ”.</p>
        `
    },

    {
        id: "11",
        title: "Tư Duy Ngược",
        supplier: "CÔNG TY CỔ PHẦN SBOOKS",
        category: "Sách Tiếng Việt",
        author: "Nguyễn Anh Dũng",
        publisher: "Dân Trí",
        binding: "Bìa Mềm",
        reviewCount: 1,
        // soldCount: 0,
        currentPrice: 69500,
        // stock: 0,
        oldPrice: 139000,
        discount: 50,
        mainImage: "../img/Tu-Duy-Nguoc-Nguyen-Anh-Dung.jpg",
        thumbnails: [
            "../img/Tu-Duy-Nguoc-Nguyen-Anh-Dung.jpg",
            "../img/sach-tu-duy-nguoc-9.jpg",
            "../img/9159f33d76044d568a28311b4eccf0f1tplv-o3syd03w52-origin-jpeg-1.jpg"
        ],
        sku: "9786043440287",
        releaseDate: "30/05/2021",
        year: 2021,
        pages: 242,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>Tư Duy Ngược</h2>
            <p>Chúng ta thực sự có hạnh phúc không? Chúng ta có đang sống cuộc đời mình không? Chúng ta có dám dũng cảm chiến thắng mọi khuôn mẫu, định kiến, đi ngược đám đông để khẳng định bản sắc riêng của mình không?. Có bao giờ bạn tự hỏi như thế, rồi có câu trả lời cho chính mình?</p>
            <p>Tôi biết biết, không phải ai cũng đang sống cuộc đời của mình, không phải ai cũng dám vượt qua mọi lối mòn để sáng tạo và thành công… Dựa trên việc nghiên cứu, tìm hiểu, chắt lọc, tìm kiếm, ghi chép từ các câu chuyện trong đời sống, cũng như trải nghiệm của bản thân, tôi viết cuốn sách này.</p>
            <p>Cuốn sách sẽ giải mã bạn là ai, bạn cần <strong>Tư duy ngược</strong> để thành công và hạnh phúc như thế nào và các phương pháp giúp bạn dũng cảm sống cuộc đời mà bạn muốn.</p>
        `
    },

    {
        id: "12",
        title: "Sưởi Ấm Mặt Trời",
        supplier: "Nhã Nam",
        category: "Sách Tiếng Việt",
        author: "Joses Mauro De Vasconcelos",
        publisher: "Hội Nhà Văn",
        binding: "Bìa Cứng",
        reviewCount: 0,
        // soldCount: 0,
        currentPrice: 128000,
        // stock: 0,
        oldPrice: 160000,
        discount: 20,
        mainImage: "../img/suoi-am-mat-troi.jpg",
        thumbnails: [
            "../img/z5680784573494_660674bdecd3f5bd8e187804d35223d8.jpg",
            "../img/suoi-am-mat-troi.jpg",
            "../img/suoi-am-mat-troi-2.jpg"
        ],
        sku: "8935235242173",
        releaseDate: "19/09/2024",
        year: 2024,
        pages: 376,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>Sưởi Ấm Mặt Trời</h2>
            <p><strong>VỀ TÁC GIẢ: José Mauro de Vasconcelos</strong></p>
            <hr> 
            <p>Ông là một nhà văn vĩ đại nhưng lại có xuất thân nghèo khó ở Brazil. Ông từng làm nhiều công việc khác nhau trước khi trở thành nhà văn</p>
            <p>Những trải nghiệm tuổi thơ đầy gian truân là nguồn cảm hứng để ông viết nên “Cây Cam Ngọt Của Tôi” (1968) – tác phẩm nổi tiếng nhất trong sự nghiệp.</p>
            <p>"Sưởi Ấm Mặt Trời" là phần tiếp theo, tiếp tục câu chuyện về Zezé với những tổn thương sâu sắc hơn.</p>
            <p>Văn phong giản dị, chân thực, giàu cảm xúc, khiến bao thế hệ độc giả rơi nước mắt và suy ngẫm về tình yêu thương, sự mất mát và giá trị của một tuổi thơ trọn vẹn.</p>
            <p><strong>TÓM TẮT NỘI DUNG SÁCH:</strong></p>
            <hr>
            <p>Zezé – cậu bé từng trò chuyện với cây cam ngọt, nay đã lớn hơn và đối diện với một thế giới khắc nghiệt hơn. Mồ côi mẹ, bị cha ghẻ lạnh, Zezé lạc lõng giữa cuộc đời đầy cay đắng.</p>
            <p>Cuộc gặp gỡ với Manuel Valadares mang đến cho cậu tình yêu thương hiếm hoi, nhưng định mệnh tàn nhẫn lại cướp đi tất cả. Zezé sẽ phải đối mặt với mất mát ra sao? Liệu ánh sáng ấm áp của mặt trời có còn sưởi ấm trái tim cậu?</p>
            <p>"Có những nỗi đau không ai thấy, nhưng chúng vẫn đục khoét tâm hồn ta từng ngày."<br> "Nếu lớn lên nghĩa là quên đi những người mình yêu thương, thì cháu không muốn nữa!"</p>
            <P>Một câu chuyện đầy ám ảnh về tuổi thơ, tình yêu thương và những vết thương không bao giờ lành. Bạn đã sẵn sàng bước vào thế giới của Zezé chưa?</P>        
        `
    },
    
    {
        id: "13",
        title: "Chúa Tể Rừng Xanh - Tập 2",
        supplier: "NXB Trẻ",
        category: "Manga - Comic",
        author: "Osamu Tezuka",
        publisher: "Trẻ",
        binding: "Bìa cứng",
        reviewCount: 0,
        // soldCount: 0,
        currentPrice: 38000,
        // stock: 0,
        oldPrice: 40000,
        discount: 5,
        mainImage: "../img/nxbtre_full_22452025_084547_0bcd9e14bd2949eab10194ff2eca71ed_grande.jpg",
        thumbnails: [
            "../img/nxbtre_full_22452025_084547_0bcd9e14bd2949eab10194ff2eca71ed_grande.jpg"
        ],
        sku: "8934974209706",
        releaseDate: "05/03/2025",
        year: 2025,
        pages: 186,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>Chúa Tể Rừng Xanh - Tập 2</h2>
            <p>Leo là một chú sư tử trắng. Chú là con trai của Panja - chúa tể rừng xanh ở một cánh rừng tại châu Phi. Cha chú đã bị thợ săn bắn chết, còn mẹ bị bắt đem tới vườn thú và hạ sinh chú trên tàu vận chuyển. Khi sinh chú ra mẹ đã căn dặn chú hãy trở về châu Phi thừa kế ngôi vị của cha. Tuy nhiên, con tàu vận chuyển gặp bão và bị đắm. Mẹ Leo đã chết chìm cùng con tàu ngoài khơi xa, còn chú lại lênh đênh trên biển và trôi dạt vào bán đảo Ả Rập. Tại đây chú được một thiếu niên tên Ken nhận nuôi. 1 năm sau, Ken và Leo cùng đoàn nghiên cứu đến châu Phi. Để bảo vệ những động vật nhỏ yếu nơi đây khỏi cuộc sống mạnh được yếu thua, Leo đã đứng lên nhận trọng trách của một vị vua</p>
        `
    },

    {
        id: "14",
        title: "Tưởng Giới - Đứa Con Trở Về",
        supplier: "CÔNG TY CỔ PHẦN SBOOKS",
        category: "Tiểu Thuyết",
        author: "Nhất Quang",
        publisher: "Hội Nhà Văn",
        binding: "Bìa Mềm",
        reviewCount: 100,
        // soldCount: 0,
        currentPrice: 71760,
        // stock: 0,
        oldPrice: 138000,
        discount: 17,
        mainImage: "../img/104cb74d248eff9b8fb60e740058d9c8.jpg",
        thumbnails: [
            "../img/104cb74d248eff9b8fb60e740058d9c8.jpg"
        ],
        sku: "9786043830125",
        releaseDate: "23/04/2022",
        year: 2022,
        pages: 348,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>Tưởng Giới - Đứa Con Trở Về</h2>
            <p>Lấy cảm hứng từ những chất liệu có mặt trong kho tàng văn hóa – lịch sử Việt Nam, tiểu thuyết <strong>Tưởng Giới</strong> là một sự sáng tạo độc đáo của tác giả Nhất Quang.</p>
            <p>Tiểu thuyết bao gồm 20 chương kể về một hành trình kỳ ảo của Linh, một cô bé học sinh phổ thông, sinh trưởng trong một gia đình Hà Nội, có một sự say mê vô cùng với những truyện cổ tích dân gian. Linh ngay từ bé đã được ấn định số mệnh của cô cho một nhiệm vụ thần thoại mà cô phải thực hiện trong tương lai.</p>
            <p>Trong một lần làm giỗ cho người bà thân yêu của mình, do sơ sẩy Linh vô tình làm rơi vỡ chén đĩa từ bàn thờ, việc này khiến cô bị bố mắng cho một trận rất nặng, sự nóng giận của bố khiến Linh cảm thấy bị tổn thương, cô bé phải chạy đến bên bờ hồ và trong sự miên man ngẫm nghĩ về câu chuyện vụng về của mình, cô đã bị rơi xuống hồ nước nhưng tai nạn này lại dẫn cô đến sứ mệnh của mình: cô đã lạc vào một thế giới thần thoại khác, đó là Xứ Thanh Giang, nơi sinh sống của các loài thủy tộc, và đây là nơi Tộc Rùa, dòng tộc của Thần Kim Quy đang ngự trị.</p>
            <p>Kể từ đây, hành trình thần thoại – kỳ ảo của Linh đã bắt đầu.</p>
        
        `
    },

    {
        id: "15",
        title: "Âm Mưu Thay Não",
        supplier: "Bách Việt",
        category: "Tiểu Thuyết",
        author: "Giản Tư Hải",
        publisher: "NXB Thanh Niên",
        binding: "Bìa Mềm",
        reviewCount: 5,
        // soldCount: 0,
        currentPrice: 77400,
        // stock: 0,
        oldPrice: 129000,
        discount: 40,
        mainImage: "../img/wsbb4tr_2d9df193fb514df2855e7a8ad50c9ef7_master.jpg",
        thumbnails: [
            "../img/wsbb4tr_2d9df193fb514df2855e7a8ad50c9ef7_master.jpg",
            "../img/ef43cc0683f6cfd586b81cdaa89eec0c.jpg"
        ],
        sku: "9786049845550",
        releaseDate: "16/12/2019",
        year: 2019,
        pages: 472,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>Âm Mưu Thay Não</h2>
            <p><em><strong>Thông tin tác giả:</strong></em></p>
            <p>Giả Tư Hải sinh năm 1977 tại Thanh Chương - Nghệ An. Tốt nghiệp Đại học Kiến Trúc Hà Nội năm 1999. Hiện chuyên sáng tác văn học thể loại tiểu thuyết trinh thám.</p>
            <p><em><strong>Thông tin tác phẩm:</strong></em></p>
            <p>“Gửi Trần Phách! Tôi đang bị bắt cóc dưới một căn hầm nhiều xác chết và bị tra tấn nếu không nghe theo lệnh của chúng. Tôi không rõ địa điểm ở đâu vì sau vụ tấn công, chúng bịt mắt và đưa tôi lên ô tô ra khỏi hiện trường khoảng nửa giờ chạy xe. Chúng sẽ hành quyết cả nhóm trong 48 tiếng nữa. Hãy cứu tôi.”</p>
            <p>Bác sĩ: Tôn Thất Sắc</p>
            <p>-------------------</p>
            <p>Khi lén lút gửi tin nhắn này đi, ông không thể ngờ rằng người nhận tin nhắn này vốn là một trinh sát đặc nhiệm cũng đang bị truy sắt gắt gao bởi nhóm vũ trang giấu mặt trên xứ sở Chùa Tháp.</p>
            <p>Trước khi bị nhóm bắt cóc phát giác, người bác sĩ nổi tiếng này còn kịp gửi tin nhắn thứ ba đến một nhân vật cộm cán có thể quyết định đến mạng sống của ông. Tuy nhiên, nhân vật bí ẩn này đã phớt lờ lời kếu cứu của ông. Điều đó dẫn đến hậu quả là đã gây ra một thảm họa lớn trong lịch sử Campuchia hiện đại chỉ sau nạn diệt chủng.</p>
            <p>Một lần nữa, những chiến sĩ an ninh Việt Nam lại phải đối mặt với âm mưu khủng bố mang tính quốc tế. Một kế hoạch tinh vi, xảo quyệt và đầy tham vọng đang được triển khai ở Campuchia. Và hơn hết, bọn khủng bố còn lôi kéo cả những nhà khoa học hàng đầu Việt Nam dính dáng đến tội ác này. Liệu chính nghĩa có chiến thắng trước một kẻ thù nham hiểm và tàn bạo cùng một âm mưu cực kỳ hoàn hảo?</p>
        `
    },

    {
        id: "16",
        title: "Combo Sách Kỹ Thuật Lập Trình C và C++ Và Lập Trình Hướng Đối Tượng",
        supplier: "Huy Hoang Bookstore",
        category: "Sách Tin Học - Công Nghệ",
        author: "GS. Phạm Văn Ất, ThS. Đỗ Văn Tuấn, ThS. Nguyễn Hiếu Cường, Lê Trường Thông",
        publisher: "Bách Khoa Hà Nội",
        binding: "Bìa Mềm",
        reviewCount: 0,
        // soldCount: 0,
        currentPrice: 290080,
        // stock: 0,
        oldPrice: 370000,
        discount: 21,
        mainImage: "../img/sach-combo-giao-trinh-ky-thuat-lap-trinh-c-can-ban-va-nang-cao-giao-trinh-c-va-lap-trinh-huong-doi-tuong-2-quyen-0.jpg",
        thumbnails: [
            "../img/sach-combo-giao-trinh-ky-thuat-lap-trinh-c-can-ban-va-nang-cao-giao-trinh-c-va-lap-trinh-huong-doi-tuong-2-quyen-0.jpg"
        ],
        sku: "8935095633166",
        releaseDate: "09/12/2023",
        year: 2023,
        pages: 440,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>Combo Sách Kỹ Thuật Lập Trình C và C++ Và Lập Trình Hướng Đối Tượng</h2>
            <p>Combo gồm 2 cuốn sách:</p>
            <p>1. Giáo Trình Kỹ Thuật Lập Trình C Căn Bản Và Nâng Cao</p>
            <p>2. Giáo Trình C++ Và Lập Trình Hướng Đối Tượng</p>
        `
    },

    {
        id: "17",
        title: "Chip War - Cuộc Chiến Vi Mạch",
        supplier: "Nhã Nam",
        category: "Sách Kinh Tế",
        author: "Chris Miller",
        publisher: "Thế Giới",
        binding: "Bìa Cứng",
        reviewCount: 110,
        // soldCount: 0,
        currentPrice: 240000,
        // stock: 0,
        oldPrice: 300000,
        discount: 20,
        mainImage: "../img/211b8530a8d9a26a04d1b29142fb9223.jpg",
        thumbnails: [
            "../img/211b8530a8d9a26a04d1b29142fb9223.jpg",
            "../img/2024_05_31_16_48_33_9-390x510_850cbb26f39d41c9ba028d8e99f69f49.jpg",
        ],
        sku: "8935235241374",
        releaseDate: "10/02/2024",
        year: 2024,
        pages: 480,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>Chip War - Cuộc Chiến Vi Mạch</h2>
            <p>Ngày nay, sức mạnh quân sự, kinh tế và chính trị được xây dựng trên nền tảng chip máy tính. Hầu như mọi thứ đều chạy trên các con chip, từ tên lửa đến lò vi sóng, đến cả ô tô, điện thoại thông minh, thị trường chứng khoán, thậm chí cả lưới điện.</p>
            <p>Trong <strong>Chip War - Cuộc Chiến Vi Mạch</strong>, Chris Miller kể câu chuyện về cuộc đua giành quyền kiểm soát công nghệ chip máy tính, từ những ngày đầu của ngành công nghiệp bán dẫn vào những năm 1950 đến cuộc chiến hiện đại giữa Mỹ và Trung Quốc. Ông khám phá cách các quốc gia đã sử dụng công nghệ chip để củng cố quyền lực và ảnh hưởng toàn cầu của họ, đồng thời phân tích những rủi ro và cơ hội mà cuộc chiến này mang lại cho tương lai của thế giới.</p>
            <p>Được viết với phong cách lôi cuốn và dựa trên nghiên cứu sâu rộng, <strong>Chip War - Cuộc Chiến Vi Mạch</strong> cung cấp một cái nhìn toàn diện về tầm quan trọng của chip máy tính trong thế kỷ 21 và những tác động sâu rộng của nó đối với chính trị toàn cầu.</p>
            <p>Gần đây, nước Mỹ đã thiết kế những con chip nhanh nhất và duy trì vị thế số một thế giới, nhưng lợi thế đó đang có nguy cơ suy yếu khi các đối thủ ở Đài Loan, Hàn Quốc và châu Âu nổi lên nắm quyền kiểm soát. Mỹ đã để các thành phần quan trọng của quá trình sản xuất chip vuột khỏi tầm kiểm soát, dẫn đến tình trạng thiếu chip trên toàn thế giới và cuộc chiến vi mạch nổ ra với đối thủ là Trung Quốc đang mong muốn thu hẹp khoảng cách.</p>
            <p>Trung Quốc đang chi nhiều tiền cho chip hơn bất kỳ sản phẩm nào khác, rót hàng tỷ đô la vào việc xây dựng chip, đe dọa tới ưu thế quân sự và sự thịnh vượng của nền kinh tế Mỹ.</p>
            <p>Con chip của thế kỷ 21 giống như dầu mỏ của thế kỷ 20, và vì thế, lịch sử của chất bán dẫn chính là lịch sử của thế kỷ 21. Cuộc chiến vi mạch được xem là biên niên sử về cuộc chiến kéo dài hàng thập niên để kiểm soát thứ đang nổi lên là tài nguyên quan trọng nhất nhưng lại khan hiếm: công nghệ vi mạch.</p>
        `
    },

    {
        id: "18",
        title: "Nhật Ký Trong Tù",
        supplier: "NXB Chính Trị Quốc Gia",
        category: "Văn Học",
        author: "Hồ Chí Minh",
        publisher: "Chính Trị Quốc Gia Sự Thật",
        binding: "Bìa Mềm",
        reviewCount: 250,
        // soldCount: 0,
        currentPrice: 88000,
        // stock: 0,
        oldPrice: 110000,
        discount: 20,
        mainImage: "../img/a.jpg",
        thumbnails: [
            "../img/a.jpg",
            "../img/Tờ_cuối_tập_thơ_Nhật_ký_trong_tù.jpg"
        ],
        sku: "8935279149704",
        releaseDate: "19/05/2023",
        year: 2023,
        pages: 260,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2>Nhật Ký Trong Tù</h2>
            <p>Tác phẩm “Nhật ký trong tù” là tập thơ gồm 133 bài, viết bằng chữ Hán, ra đời trong một hoàn cảnh đặc biệt. Tháng 8/1942, Nguyễn Ái Quốc bị chính quyền Tưởng Giới Thạch bắt giam vô cớ tại Túc Vinh, Quảng Tây, khi Người sang Trung Quốc công tác với danh nghĩa là đại biểu của Việt Nam độc lập đồng minh và Phân bộ quốc tế phản xâm lược của Việt Nam. Và từ đây bắt đầu hành trình 13 tháng đầy gian nan, cực khổ trải qua 18 nhà lao của 13 huyện thuộc tỉnh Quảng Tây. Trong những tháng ngày đó (tháng 8/1942 – tháng 9/1943), Người đã sáng tác tập thơ “Ngục trung nhật ký” (Nhật ký trong tù).</p>
            <p>Tập thơ phản ánh một cách chân thực về chế độ nhà tù và một phần xã hội Trung Quốc dưới thời Tưởng Giới Thạch. Nhà tù là nơi diễn ra nhiều tệ nạn (đánh bạc, buôn bán, hối lộ…), với bao bất công, ngang trái, đày ải, áp bức người dân trong cảnh khốn cùng. Mỗi bài thơ trong tập nhật ký là tiếng lòng của tác giả, khắc họa sâu sắc tâm hồn, những suy nghĩ, tình cảm của Bác trong thời gian bị giam cầm nơi đất khách. Đó là lòng yêu nước thiết tha, luôn đau đáu hướng về Tổ quốc, mong được trở về hòa mình vào cuộc chiến đấu của đồng chí, đồng bào. Tình yêu thương bao la, vô bờ bến của Người không chỉ dành cho mọi kiếp người, không phân biệt giai cấp, dân tộc mà còn là tình yêu thiên nhiên, hòa mình vào muôn cảnh vật. Toát lên từ toàn bộ tập nhật ký là một tinh thần lạc quan cách mạng, niềm tin vào ngày mai tươi sáng, ý chí kiên cường, bền bỉ, lòng quyết tâm sắt đá của Người. Bản lĩnh của người chiến sĩ cộng sản, sức mạnh tinh thần lớn lao đã đưa Người vượt qua đày ải, ngục tù, đến với ngày tự do, trở về Tổ quốc thân yêu, lãnh đạo toàn dân giành độc lập, tự do cho dân tộc. Tác phẩm đã trở thành bảo vật quốc gia của Việt Nam, được bạn bè quốc tế ngợi ca và được dịch ra nhiều ngôn ngữ trên thế giới.</p>
        `
    },

    {
        id: "19",
        title: "Cái Tết Của Mèo Con",
        supplier: "Nhà Xuất Bản Kim Đồng",
        category: "Sách Thiếu Nhi",
        author: "Nguyễn Đình Thi, Ngô Mạng Lân",
        publisher: "NXB Kim Đồng",
        binding: "Bìa Mềm",
        reviewCount: 9,
        // soldCount: 0,
        currentPrice: 40500,
        // stock: 0,
        oldPrice: 45000,
        discount: 10,
        mainImage: "../img/cai-tet-cua-meo-con-sach-ki-niem-65-nam.jpg",
        thumbnails: [
            "../img/cai-tet-cua-meo-con-sach-ki-niem-65-nam.jpg"
        ],
        sku: "8935244827217",
        releaseDate: "28/09/2019",
        year: 2019,
        pages: 44,
        description: `
            <h1>Mô tả sản phẩm</h1>
            <h2><strong>Cái Tết Của Mèo Con</strong></h2>
            <p>Mèo con mới về nhà, đêm đầu tiên đã giáp mặt lão Chuột cống dữ dằn cùng lũ chuột nhắt hung hăng. Mèo con khiếp sợ, nhưng vốn là một chú mèo dũng cảm, Mèo con bắt đầu học hỏi, can đảm đánh nhau với rắn hổ mang.</p>
            <p>Không những thế, Mèo con còn truyền lòng quả cảm của mình cho cả bác Nồi đồng và chị Chổi. Họ đã cùng nhau đánh bại lão Chuột cống hung ác và đám chuột nhắt.</p>
            <p>“Cái Tết của Mèo con” là bài học về lòng quả cảm và tinh thần đoàn kết. Câu chuyện mang đến thông điệp cho các bạn nhỏ của chúng ta: Lòng dũng cảm là một phẩm chất, được hình thành khi ta rèn luyện mỗi ngày.</p>
            <p>Ra đời cách nay hơn nửa thế kỉ, tác phẩm của nhà văn Nguyễn Đình Thi đã chinh phục bao thế hệ độc giả nhỏ tuổi.</p>       
        `
    },

    {
        id: "20",
        title: "Di Sản Hồ Chí Minh - Hành Trình Theo Chân Bác (Tái Bản 2021)",
        supplier: "NXB Trẻ",
        category: "Chính Trị - Pháp Luật",
        author: "Trần Đức Tuấn",
        publisher: "NXB Trẻ",
        binding: "Bìa Mềm",
        reviewCount: 0,
        // soldCount: 0,
        currentPrice: 106000,
        // stock: 0,
        oldPrice: 125000,
        discount: 15,
        mainImage: "../img/hanh-trinh-theo-chan-bac.jpg",
        thumbnails: [
            "../img/hanh-trinh-theo-chan-bac.jpg",
            "../img/nxbtre_hanh-trinh-theo-chan-bac.pdf_page-18.png",
            "../img/nxbtre_hanh-trinh-theo-chan-bac.pdf_page-19.png",
        ],
        sku: "8934974173922",
        releaseDate: "18/11/2021",
        year: 2021,
        pages: 351,
        description: `<p>Hành trình của đoàn làm phim...</p>` // (Hãy dán description đầy đủ của bạn vào đây)
    }
];

const DEFAULT_IMPORTS = [
    { 
        id: 9999, 
        date: '2025-10-01', // Ngày nhập kho ban đầu
        status: 'Hoàn thành', 
        notes: 'Phiếu nhập kho ban đầu 1000 sản phẩm mỗi loại.', 
        items: [
            // Dưới đây là 20 sản phẩm, mỗi loại 1000 cái
            // Giá vốn (costPrice) được lấy từ giá bán (currentPrice) trong DEFAULT_PRODUCTS
            { productId: "01", quantity: 1000, costPrice: 85000 },
            { productId: "02", quantity: 1000, costPrice: 82000 },
            { productId: "03", quantity: 1000, costPrice: 194000 },
            { productId: "04", quantity: 1000, costPrice: 254000 },
            { productId: "05", quantity: 1000, costPrice: 188000 },
            { productId: "06", quantity: 1000, costPrice: 114500 },
            { productId: "07", quantity: 1000, costPrice: 240000 },
            { productId: "08", quantity: 1000, costPrice: 356000 },
            { productId: "09", quantity: 1000, costPrice: 135000 },
            { productId: "10", quantity: 1000, costPrice: 315000 },
            { productId: "11", quantity: 1000, costPrice: 69500 },
            { productId: "12", quantity: 1000, costPrice: 128000 },
            { productId: "13", quantity: 1000, costPrice: 38000 },
            { productId: "14", quantity: 1000, costPrice: 71760 },
            { productId: "15", quantity: 1000, costPrice: 77400 },
            { productId: "16", quantity: 1000, costPrice: 290080 },
            { productId: "17", quantity: 1000, costPrice: 240000 },
            { productId: "18", quantity: 1000, costPrice: 88000 },
            { productId: "19", quantity: 1000, costPrice: 40500 },
            { productId: "20", quantity: 1000, costPrice: 106000 }
        ]
    }
];

// --- Dữ liệu Orders (CẬP NHẬT TRẠNG THÁI) ---
const DEFAULT_ORDERS = [
    { 
        id: "OD-001", 
        customerName: 'Nam', 
        orderDate: '2020-09-15', 
        status: 'Đã giao', // <-- SỬA TỪ "Hoàn thành"
        items: [
            { productId: "01", quantity: 2, sellPrice: 85000 }
        ]
    },
    { 
        id: "OD-002", 
        customerName: 'Vu', 
        orderDate: '2025-10-20', 
        status: 'Đã xử lý', // <-- SỬA TỪ "Đang xử lý"
        items: [
            { productId: "05", quantity: 2, sellPrice: 188000 }
        ]
    },
    { 
        id: "OD-003", 
        customerName: 'NhatAn', 
        orderDate: '2025-10-22', 
        status: 'Hủy', // <-- SỬA TỪ "Đã hủy"
        items: [
            { productId: "09", quantity: 2, sellPrice: 135000 }
        ]
    }
];

// BƯỚC 3: ĐỊNH NGHĨA TẤT CẢ CÁC HÀM (CRUD)
// (Tất cả các hàm này đã được viết để làm việc với Mảng,

// --- User Functions ---
function getAllUsers() {
    const usersJson = localStorage.getItem(USER_DATA_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
}
function saveAllUsers(users) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(users));
}

// --- Category Functions ---
function getAllCategories() {
    const categoriesJson = localStorage.getItem(CATEGORY_DATA_KEY);
    return categoriesJson ? JSON.parse(categoriesJson) : [];
}
function saveAllCategories(categories) {
    localStorage.setItem(CATEGORY_DATA_KEY, JSON.stringify(categories));
}
function getCategoryById(id) {
    return getAllCategories().find(c => c.id == id);
}
function addNewCategory(categoryData) {
    const categories = getAllCategories();
    if (categories.some(c => c.id == categoryData.id)) {
        return { success: false, message: 'ID Loại sản phẩm đã tồn tại.' };
    }
    categories.push(categoryData);
    saveAllCategories(categories);
    return { success: true };
}
function updateCategory(categoryId, updatedData) {
    let categories = getAllCategories();
    const index = categories.findIndex(c => c.id == categoryId);
    if (index === -1) { return { success: false, message: 'Không tìm thấy loại.' }; }
    categories[index] = { ...updatedData, id: parseInt(categoryId) };
    saveAllCategories(categories);
    return { success: true };
}
function deleteCategory(categoryId) {
    let categories = getAllCategories();
    const updatedCategories = categories.filter(c => c.id != categoryId);
    saveAllCategories(updatedCategories);
    return { success: true };
}

// --- Product Functions ---
function getAllProducts() {
    const productsJson = localStorage.getItem(PRODUCT_DATA_KEY);
    return productsJson ? JSON.parse(productsJson) : [];
}
function saveAllProducts(products) {
    localStorage.setItem(PRODUCT_DATA_KEY, JSON.stringify(products));
}
function getProductById(id) {
    const products = getAllProducts();
    return products.find(p => p.id == id);
}
function addNewProduct(productData) {
    const products = getAllProducts();
    if (products.some(p => p.id == productData.id)) {
        return { success: false, message: 'ID sản phẩm đã tồn tại.' };
    }
    products.push(productData);
    saveAllProducts(products);
    return { success: true };
}
function updateProduct(productId, updatedData) {
    let products = getAllProducts();
    const productIndex = products.findIndex(p => p.id == productId);
    if (productIndex === -1) { return { success: false, message: 'Không tìm thấy sản phẩm.' }; }
    products[productIndex] = updatedData;
    saveAllProducts(products);
    return { success: true };
}
function deleteProduct(productId) {
    let products = getAllProducts();
    const updatedProducts = products.filter(p => p.id != productId);
    saveAllProducts(updatedProducts);
    return { success: true };
}

// --- Import Functions (HÀM MỚI) ---
function getAllImports() {
    const importsJson = localStorage.getItem(IMPORT_DATA_KEY);
    return importsJson ? JSON.parse(importsJson) : [];
}
function saveAllImports(imports) {
    localStorage.setItem(IMPORT_DATA_KEY, JSON.stringify(imports));
}
function getImportById(id) {
    return getAllImports().find(i => i.id == id);
}
function addNewImport(importData) {
    const imports = getAllImports();
    if (imports.some(i => i.id == importData.id)) {
        return { success: false, message: 'ID Phiếu nhập đã tồn tại.' };
    }
    imports.push(importData);
    saveAllImports(imports);
    return { success: true };
}
function updateImport(importId, updatedData) {
    let imports = getAllImports();
    const index = imports.findIndex(i => i.id == importId);
    if (index === -1) {
        return { success: false, message: 'Không tìm thấy phiếu nhập.' };
    }
    imports[index] = { ...updatedData, id: parseInt(importId) };
    saveAllImports(imports);
    return { success: true };
}
function deleteImport(importId) {
    let imports = getAllImports();
    const updatedImports = imports.filter(i => i.id != importId);
    saveAllImports(updatedImports);
    return { success: true };
}

// --- Order Functions (HÀM MỚI) ---
function getAllOrders() {
    const ordersJson = localStorage.getItem(ORDER_DATA_KEY);
    return ordersJson ? JSON.parse(ordersJson) : [];
}
function saveAllOrders(orders) {
    localStorage.setItem(ORDER_DATA_KEY, JSON.stringify(orders));
}
function getOrderById(id) {
    return getAllOrders().find(o => o.id == id);
}

function addNewOrder(orderData) {
    const orders = getAllOrders();
    if (orders.some(o => o.id == orderData.id)) {
        return { success: false, message: 'ID Đơn hàng đã tồn tại.' };
    }
    orders.push(orderData);
    saveAllOrders(orders);
    return { success: true };
}


// Admin thường không tự tạo đơn mới, chỉ cập nhật và xóa
function updateOrder(orderId, updatedData) {
    let orders = getAllOrders();
    const index = orders.findIndex(o => o.id == orderId);
    if (index === -1) {
        return { success: false, message: 'Không tìm thấy đơn hàng.' };
    }
    // Chỉ cập nhật, không ghi đè toàn bộ
    orders[index] = { ...orders[index], ...updatedData };
    saveAllOrders(orders);
    return { success: true };
}
function deleteOrder(orderId) {
    let orders = getAllOrders();
    const updatedOrders = orders.filter(o => o.id != orderId);
    saveAllOrders(orders);
    return { success: true };
}

// BƯỚC 4: HÀM KHỞI TẠO (Duy nhất)
function initializeDatabase() {
    // Khởi tạo user
    if (!localStorage.getItem(USER_DATA_KEY)) {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(DEFAULT_USERS));
        console.log('Database initialized with default users.');
    }
    
    // Khởi tạo product (Sử dụng mảng 20 sản phẩm mới)
    if (!localStorage.getItem(PRODUCT_DATA_KEY)) {
        localStorage.setItem(PRODUCT_DATA_KEY, JSON.stringify(DEFAULT_PRODUCTS));
        console.log('Database initialized with 20 default products.');
    }

    // Khởi tạo category
    if (!localStorage.getItem(CATEGORY_DATA_KEY)) {
        localStorage.setItem(CATEGORY_DATA_KEY, JSON.stringify(DEFAULT_CATEGORIES));
        console.log('Database initialized with default categories.');
    }

    // Khởi tạo Imports (THÊM MỚI)
    if (!localStorage.getItem(IMPORT_DATA_KEY)) {
        localStorage.setItem(IMPORT_DATA_KEY, JSON.stringify(DEFAULT_IMPORTS));
        console.log('Database initialized with default imports.');
    }

    // Khởi tạo Orders (THÊM MỚI)
    if (!localStorage.getItem(ORDER_DATA_KEY)) {
        localStorage.setItem(ORDER_DATA_KEY, JSON.stringify(DEFAULT_ORDERS));
        console.log('Database initialized with default orders.');
    }
}


// BƯỚC 5: GỌI HÀM KHỞI TẠO (CUỐI CÙNG)
initializeDatabase();