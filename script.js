// Script.js

// سیستم تب‌ها
const tabs = document.querySelectorAll('.tab');
const contentTabs = document.querySelectorAll('.content-tab');

// مخفی کردن تمام تب‌ها
function hideContentTabs() {
    contentTabs.forEach(tab => {
        tab.style.display = 'none';
    });
}

// نشان دادن محتوای تب انتخابی
function showTabContent(tabId) {
    hideContentTabs();
    const tab = document.getElementById(tabId);
    tab.style.display = 'block';

    // اسکرول به بالای تب
    tab.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // ذخیره تب فعال
    sessionStorage.setItem('activeTab', tabId);

    // بروزرسانی تب فعال در منو
    tabs.forEach(t => t.classList.remove('active-tab'));
    document.querySelector(`.tab#tab-${tabId.split('-')[1]}`).classList.add('active-tab');
}

// بررسی و تنظیم تب فعال
function checkActiveTab() {
    const tabId = sessionStorage.getItem('activeTab');
    if (tabId) {
        showTabContent(tabId);
    } else {
        showTabContent('content-1');
    }
}

// رفتن به صفحه اصلی با کلیک روی لوگو
document.querySelector('.N').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('activeTab');
    showTabContent('content-1');
});


// اضافه کردن رویداد کلیک به تب‌ها
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = 'content-' + tab.id.split('-')[1];
        showTabContent(tabId);
    });
});

// اسلایدر
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

// لود اسکیرین
document.body.style.overflow = 'hidden';

window.addEventListener('load', () => {
    // بررسی تب فعال
    checkActiveTab();

    // تاخیر برای نمایش لودینگ
    setTimeout(() => {
        const loader = document.querySelector('.loading-screen');
        loader.classList.add('fade-out');

        // لود تصاویر بعد از اتمام انیمیشن
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
            lazyLoadImages();
        }, 1000);
    }, 800);
});


// اشتراک‌گذاری در شبکه‌های اجتماعی
function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("سایت جالب مدرسه غزال را ببینید!");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("سایت جالب مدرسه غزال را ببینید: ");
    window.open(`https://wa.me/?text=${text}${url}`, '_blank');
}

function shareOnTelegram() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("سایت جالب مدرسه غزال را ببینید!");
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}
