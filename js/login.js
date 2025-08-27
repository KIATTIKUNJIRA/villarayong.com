const SUPABASE_URL = 'https://wixwwaztcsbprbtogijp.supabase.co'; // ใส่ Supabase Project URL ของคุณที่นี่
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpeHd3YXp0Y3NicHJidG9naWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzgzNTMsImV4cCI6MjA3MTcxNDM1M30.Yxn58-gFXnS3bM-UOjKXz_o2rp4Dz5sGztyiIN4hSBY'; // ใส่ Supabase Anon Key ของคุณที่นี่

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า

    const email = event.target.email.value;
    const password = event.target.password.value;
    errorMessage.textContent = ''; // ล้างข้อความ error เก่า

    const { data, error } = await _supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Error logging in:', error.message);
        errorMessage.textContent = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
    } else {
        console.log('Successfully logged in!', data.user);
        // หากล็อกอินสำเร็จ ให้เปลี่ยนเส้นทางไปยังหน้า dashboard
        window.location.href = '/admin-dashboard.html'; // หรือหน้าที่ต้องการ
    }
});