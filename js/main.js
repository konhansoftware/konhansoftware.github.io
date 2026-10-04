/**
 * KONHAN SOFTWARE - İNTERAKTİF JAVASCRIPT DOSYASI
 * konhansoftware.github.io
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Efekti
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobil Menü Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isActive = mobileDrawer.classList.toggle('active');
      mobileToggle.innerHTML = isActive 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Mobil menüdeki linke tıklandığında menüyü kapat
    const mobileLinks = mobileDrawer.querySelectorAll('.nav-link, .btn');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // 3. İstatistik Sayaç Animasyonu (Scroll ile tetiklenen sayaç)
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const countUp = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = isDecimal 
        ? current.toFixed(1) + '%' 
        : Math.floor(current) + (el.getAttribute('data-suffix') || '');
    }, stepTime);
  };

  const observerStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        statNumbers.forEach(stat => countUp(stat));
        counted = true;
      }
    });
  }, { threshold: 0.5 });

  const statsBanner = document.querySelector('.stats-banner');
  if (statsBanner) {
    observerStats.observe(statsBanner);
  }

  // 4. Hero Terminal Sekmeleri
  const termTabs = document.querySelectorAll('.term-tab');
  const termCodeOutput = document.getElementById('termCodeOutput');

  const codeSnippets = {
    typescript: `<span class="code-comment">// Konhan Cloud Native API Service</span>
<span class="code-keyword">import</span> { Microservice, SecureEngine } <span class="code-keyword">from</span> <span class="code-string">'@konhan/core'</span>;

<span class="code-keyword">export class</span> <span class="code-function">EnterpriseGateway</span> {
  <span class="code-keyword">private readonly</span> engine: SecureEngine;

  <span class="code-keyword">constructor</span>() {
    <span class="code-keyword">this</span>.engine = <span class="code-keyword">new</span> <span class="code-function">SecureEngine</span>({
      <span class="code-property">region</span>: <span class="code-string">'eu-central-1'</span>,
      <span class="code-property">scalability</span>: <span class="code-string">'auto'</span>,
      <span class="code-property">encryption</span>: <span class="code-string">'AES-256-GCM'</span>,
      <span class="code-property">uptimeSLA</span>: <span class="code-string">'99.99%'</span>
    });
  }

  <span class="code-keyword">async</span> <span class="code-function">dispatchMissionCritical</span>(payload: Payload): Promise&lt;Result&gt; {
    <span class="code-keyword">return await this</span>.engine.<span class="code-function">executeHighThroughput</span>(payload);
  }
}`,
    python: `<span class="code-comment"># Konhan AI & Deep Learning Inference Pipeline</span>
<span class="code-keyword">import</span> torch
<span class="code-keyword">from</span> konhan_ai <span class="code-keyword">import</span> LLMEngine, VectorEmbedder

<span class="code-keyword">class</span> <span class="code-function">CognitiveIntelligencePipeline</span>:
    <span class="code-keyword">def</span> <span class="code-function">__init__</span>(self, model_version=<span class="code-string">"konhan-llm-v3"</span>):
        self.engine = LLMEngine.load_optimized(
            quantization=<span class="code-string">"FP16"</span>,
            device_target=<span class="code-string">"cuda:0"</span>
        )
        self.embedder = VectorEmbedder(dims=<span class="code-keyword">1536</span>)

    <span class="code-keyword">def</span> <span class="code-function">analyze_enterprise_data</span>(self, stream_data):
        vectors = self.embedder.embed(stream_data)
        <span class="code-keyword">return</span> self.engine.generate_insights(vectors)
`,
    devops: `<span class="code-comment"># Konhan Kubernetes Deployment Spec</span>
<span class="code-property">apiVersion</span>: apps/v1
<span class="code-property">kind</span>: Deployment
<span class="code-property">metadata</span>:
  <span class="code-property">name</span>: konhan-enterprise-cluster
<span class="code-property">spec</span>:
  <span class="code-property">replicas</span>: <span class="code-keyword">8</span>
  <span class="code-property">selector</span>:
    <span class="code-property">matchLabels</span>:
      <span class="code-property">tier</span>: backend-high-perf
  <span class="code-property">template</span>:
    <span class="code-property">spec</span>:
      <span class="code-property">containers</span>:
      - <span class="code-property">name</span>: microservice-node
        <span class="code-property">image</span>: registry.konhan.com/core:latest
        <span class="code-property">resources</span>:
          <span class="code-property">limits</span>:
            <span class="code-property">memory</span>: <span class="code-string">"4Gi"</span>
            <span class="code-property">cpu</span>: <span class="code-string">"2000m"</span>
`
  };

  termTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      termTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const lang = tab.getAttribute('data-lang');
      if (termCodeOutput && codeSnippets[lang]) {
        termCodeOutput.innerHTML = codeSnippets[lang];
      }
    });
  });

  // 5. Teknoloji Stack Filtreleme
  const techTabs = document.querySelectorAll('.tech-tab-btn');
  const techItems = document.querySelectorAll('.tech-item');

  techTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      techTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      techItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'flex';
          item.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 6. SSS (FAQ) Akordiyon
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      // Diğerlerini kapat
      faqItems.forEach(f => f.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 7. İnteraktif Proje Süre & Kapsam Hesaplayıcı
  const pillProjectType = document.querySelectorAll('.pill-type');
  const pillFeatures = document.querySelectorAll('.pill-feature');
  const estTimelineVal = document.getElementById('estTimelineVal');
  const estFeatureSummary = document.getElementById('estFeatureSummary');

  let selectedTypeWeeks = 6;
  let selectedTypeName = 'Özel Web & SaaS Platformu';
  let selectedFeatureCount = 2;

  const updateEstimator = () => {
    let totalWeeks = selectedTypeWeeks;
    let checkedPills = 0;
    
    pillFeatures.forEach(pill => {
      if (pill.classList.contains('selected')) {
        totalWeeks += parseInt(pill.getAttribute('data-weeks') || '1', 10);
        checkedPills++;
      }
    });

    if (estTimelineVal) {
      estTimelineVal.textContent = `${totalWeeks} - ${totalWeeks + 3} Hafta`;
    }

    if (estFeatureSummary) {
      estFeatureSummary.innerHTML = `
        <li><i class="fa-solid fa-circle-check"></i> Proje Tipi: <strong>${selectedTypeName}</strong></li>
        <li><i class="fa-solid fa-circle-check"></i> Seçilen Ek Modüller: <strong>${checkedPills} Modül</strong></li>
        <li><i class="fa-solid fa-circle-check"></i> Çevik Sprint Planı & Kod Garantisi</li>
        <li><i class="fa-solid fa-circle-check"></i> Tam Kaynak Kod Teslimi & Dokümantasyon</li>
      `;
    }
  };

  pillProjectType.forEach(pill => {
    pill.addEventListener('click', () => {
      pillProjectType.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedTypeWeeks = parseInt(pill.getAttribute('data-weeks') || '6', 10);
      selectedTypeName = pill.textContent.trim();
      updateEstimator();
    });
  });

  pillFeatures.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
      updateEstimator();
    });
  });

  updateEstimator();

  // 8. İletişim Formu Simülasyonu & Doğrulama
  const contactForm = document.getElementById('contactForm');
  const formNotify = document.getElementById('formNotification');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        if (formNotify) {
          formNotify.className = 'form-notification success';
          formNotify.innerHTML = `
            <i class="fa-solid fa-circle-check" style="font-size: 1.3rem;"></i>
            <div>
              <strong>Mesajınız başarıyla iletildi!</strong><br>
              Konhan Software mühendislik ekibimiz en geç 24 saat içinde sizinle iletişime geçecektir.
            </div>
          `;
          formNotify.style.display = 'flex';
        }

        contactForm.reset();

        setTimeout(() => {
          if (formNotify) {
            formNotify.style.display = 'none';
          }
        }, 8000);
      }, 1200);
    });
  }

  // 9. Yukarı Kaydır (Scroll to Top) Butonu
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 10. Proje Detay Modalı
  const modalBackdrop = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalCloseBtn');

  const projectDetails = {
    kurumsal: {
      title: "Kurumsal Web Sitesi & Dijital Kimlik Çözümleri",
      content: `
        <p style="margin-bottom:1rem; color:var(--text-muted);">Konya ve Türkiye genelindeki işletmeler için modern, hızlı, mobil uyumlu ve arama motorlarında (SEO) üst sıralara çıkan kurumsal web siteleri geliştiriyoruz.</p>
        <h4 style="margin:1rem 0 0.5rem; color:var(--text-highlight);">Öne Çıkan Özellikler:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>%100 Mobil, tablet ve masaüstü duyarlı (responsive) tasarım</li>
          <li>Arama motoru optimizasyonu (Google SEO uyumlu altyapı)</li>
          <li>WhatsApp ve doğrudan arama hızlı buton entegrasyonları</li>
          <li>Hızlı yüklenen, temiz ve modern kodlama standartları</li>
        </ul>
        <div style="margin-top:1.5rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
          <span class="project-tag">HTML5 & CSS3</span>
          <span class="project-tag">JavaScript</span>
          <span class="project-tag">SEO</span>
          <span class="project-tag">Responsive</span>
        </div>
      `
    },
    panel: {
      title: "Özel Web Yönetim Panelleri & Otomasyon",
      content: `
        <p style="margin-bottom:1rem; color:var(--text-muted);">İşletmenizin günlük iş akışını, müşteri kayıtlarını ve verilerini kolayca yönetebileceğiniz güvenli, web tabanlı özel yönetim panelleri inşa ediyoruz.</p>
        <h4 style="margin:1rem 0 0.5rem; color:var(--text-highlight);">Öne Çıkan Özellikler:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Kullanıcı dostu, sade ve anlaşılır kontrol arayüzü</li>
          <li>Veritabanı yönetimi ve güvenli veri depolama</li>
          <li>Rol tabanlı yetkilendirme ve yönetici girişleri</li>
          <li>İhtiyaca özel dinamik raporlama ve filtreleme</li>
        </ul>
        <div style="margin-top:1.5rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
          <span class="project-tag">Web Panel</span>
          <span class="project-tag">Veritabanı</span>
          <span class="project-tag">API</span>
          <span class="project-tag">Güvenlik</span>
        </div>
      `
    },
    eticaret: {
      title: "Ürün Tanıtım & Katalog / E-Ticaret Çözümleri",
      content: `
        <p style="margin-bottom:1rem; color:var(--text-muted);">Ürünlerinizi en etkili şekilde sergileyebileceğiniz, WhatsApp üzerinden anında sipariş alabileceğiniz veya çevrimiçi satış yapabileceğiniz modern katalog sistemleri.</p>
        <h4 style="margin:1rem 0 0.5rem; color:var(--text-highlight);">Öne Çıkan Özellikler:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Kategorilendirilmiş, zengin görselli ürün listeleme</li>
          <li>Tek tıkla WhatsApp sipariş ve teklif talep butonu</li>
          <li>Hızlı arama ve filtreleme özellikleri</li>
          <li>Sosyal medya (Instagram / Facebook) entegrasyonu</li>
        </ul>
        <div style="margin-top:1.5rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
          <span class="project-tag">Katalog</span>
          <span class="project-tag">WhatsApp Sipariş</span>
          <span class="project-tag">E-Ticaret</span>
          <span class="project-tag">Hızlı Satış</span>
        </div>
      `
    }
  };

  const detailButtons = document.querySelectorAll('.open-project-modal');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      if (data && modalBackdrop && modalTitle && modalBody) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        modalBackdrop.classList.add('active');
      }
    });
  });

  const closeModal = () => {
    if (modalBackdrop) modalBackdrop.classList.remove('active');
  };

  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  // ESC tuşu ile modal kapatma
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
