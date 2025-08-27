// Reviews widget (public): render approved reviews and a submission form
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config.js";
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function renderReviews(mountId){
  const el = document.getElementById(mountId);
  if (!el) return;
  el.innerHTML = "<div class='muted'>กำลังโหลดรีวิว...</div>";
  const { data, error } = await sb.from('reviews').select("*").eq('status','approved').order('created_at', { ascending:false }).limit(50);
  if (error){ el.innerHTML = "<div>โหลดรีวิวไม่ได้: "+error.message+"</div>"; return; }
  el.innerHTML = data.map(r=>`
    <div class="rv">
      <div class="rv-h"><strong>${r.name || 'ผู้เข้าพัก'}</strong> · ⭐ ${r.rating || '-'} · <span class="muted">${new Date(r.created_at).toLocaleDateString()}</span></div>
      <div class="rv-b">${(r.comment || '').replace(/</g,"&lt;")}</div>
    </div>`).join("") || "<div class='muted'>ยังไม่มีรีวิว</div>";
}

export async function mountReviewForm(formId){
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const payload = {
      name: fd.get('name') || null,
      rating: Number(fd.get('rating')) || null,
      comment: fd.get('comment') || null,
      status: 'pending'
    };
    const { error } = await sb.from('reviews').insert(payload);
    if (error){ alert(error.message); return; }
    form.reset();
    alert("ส่งรีวิวแล้ว ขอบคุณครับ! (รอแอดมินอนุมัติ)");
  });
}