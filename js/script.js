window.addEventListener('load', function() {

    // --- ส่วนสำหรับ Hamburger Menu บนมือถือ ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.main-nav ul');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navList.classList.toggle('nav-active');
        });
    }

    // --- ส่วนสำหรับอัปเดตปี Copyright อัตโนมัติ ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // --- โค้ดสำหรับ FAQ Accordion (ฉบับแก้ไขสมบูรณ์) ---
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (question && answer) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
    
                    // เปิด/ปิดอันที่คลิก
                    if (isActive) {
                        // ถ้ากำลังเปิดอยู่ -> ให้ปิด
                        item.classList.remove('active');
                        answer.style.maxHeight = '0px';
                    } else {
                        // ถ้ากำลังปิดอยู่ -> ให้เปิด
                        item.classList.add('active');
                        // คำนวณความสูงของเนื้อหา + เพิ่มพื้นที่เผื่อ 5px
                        answer.style.maxHeight = (answer.scrollHeight + 5) + 'px';
                    }
                });
            }
        });
    }

});
