(() => {
  'use strict';
  const page = document.body.dataset.page;
  const root = document.body.dataset.root || './';
  const wechat = 'sigmaboy1025';
  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const topics = {ai:'AI 用起来',career:'职业下一步',invest:'投资与判断',growth:'学习与成长',unsure:'还没想清楚'};
  const productData = {
    ai: {
      label:'从一个重复任务开始', title:'让 AI，<br>成为你的工作方式。', description:'把工具选择、知识整理与工作流串起来。先用一个任务验证，再形成自己的系统。',
      materials:[
        {title:'AI 工作流工具箱',tag:'工具与模板',desc:'任务拆解、工具选型、Prompt / Skill 思路与验证表。让一个高频任务有一条清晰的处理路径。',file:'AI工作流工具箱_样本.md',topic:'AI 工作流工具箱'},
        {title:'个人知识库方法包',tag:'知识与系统',desc:'从收集、标签到检索与复盘，整理自己的资料结构。让已有经验能被重新找到、使用和更新。',file:'个人知识库方法包_样本.md',topic:'个人知识库方法包'}
      ],
      community:'AI 实践社群',communityDesc:'主题共学、场景讨论与作品交流。先了解开放安排和你适合的参与方式。',
      consult:'1 对 1 AI 场景诊断',consultDesc:'工具选型、工作流或知识库方案 Review。需要实际搭建时，再确定定制交付范围。'
    },
    invest:{
      label:'先建立自己的研究框架',title:'少一点追逐观点，<br>多一点独立判断。',description:'资料、信息源、研究方法与复盘模板。把产业变化拆成事实、假设和可验证的关键变量。',
      materials:[
        {title:'AI 与硬科技研究资料',tag:'专题资料',desc:'产业地图、关键变量与来源索引的组织方法。先看样本结构，再了解专题与更新范围。',file:'投研方法与产业研究_样本.md',topic:'AI 与硬科技研究资料'},
        {title:'投研与决策复盘工具包',tag:'方法与模板',desc:'研究卡片、信息分级、决策日志与风险检查表。记录为什么判断，以及怎样验证。',file:'投研决策日志_样本.md',topic:'投研与决策复盘工具包'}
      ],
      community:'投研与复盘社群',communityDesc:'围绕主题交换信息、拆解逻辑、检查假设。了解议题、讨论规则与开放安排。',
      consult:'1 对 1 研究框架 Review',consultDesc:'梳理信息路径与分析缺口。先做专项诊断，再按需要确定研究与复盘陪跑。'
    },
    career:{
      label:'把已有经历讲清楚',title:'你的经历，<br>值得一个更清晰的表达。',description:'从岗位差距到项目叙事，先用方法与模板理清方向，再解决具体的简历、面试和转型问题。',
      materials:[
        {title:'职业转型与项目叙事工具包',tag:'职业方法',desc:'岗位差距、项目故事与行动清单。把“我做过什么”转成“我能解决什么问题”。',file:'职业与项目叙事_样本.md',topic:'职业方法资料'},
        {title:'求职与面试复盘模板',tag:'行动与反馈',desc:'投递记录、面试问题与反馈整理。让每次尝试都变成下一次改进的依据。',file:'职业与项目叙事_样本.md',topic:'求职与面试资料'}
      ],
      community:'职业成长共学',communityDesc:'了解同伴交流、方法分享与项目反馈安排，找到相近阶段的人一起推进。',
      consult:'1 对 1 职业诊断',consultDesc:'简历 Review、模拟面试与方向选择。需要持续反馈时，再确定转型陪跑范围。'
    },
    growth:{
      label:'把远处的目标带回今天',title:'先走清楚一步，<br>再看见更远的路。',description:'学习、求学与个人成长，先整理目标和约束。用具体行动与复盘，减少不确定带来的内耗。',
      materials:[
        {title:'目标与路径规划模板',tag:'成长方法',desc:'拆目标、看约束、排优先级。把一个大愿望变成一个近期能验证的行动。',file:'目标与路径规划_样本.md',topic:'成长规划资料'},
        {title:'学习与求学选择工具包',tag:'选择与复盘',desc:'项目比较、时间与预算、学习反馈。用结构化问题辅助一次重要选择。',file:'目标与路径规划_样本.md',topic:'学习与求学资料'}
      ],
      community:'成长与学习共学',communityDesc:'围绕目标、行动和阶段复盘交流，了解主题与参与安排。',
      consult:'1 对 1 路径诊断',consultDesc:'一起拆解选择、限制与下一步。需要实际申请或项目推进时，再讨论陪跑。'
    }
  };
  const caseData = [
    {id:'miss-frandy',client:'巴西 Miss Frandy',theme:'beauty',title:'让成分审核，<br><em>更有章法。</em>',summary:'连接成分资料与审核规则，让重复检索、比对和整理进入工作流。',problem:'成分资料分散，逐项检索和规则比对占用时间，审核依据也需要清楚留存。',approach:['整理成分资料与规则，形成可检索的结构。','让 AI 辅助提取、比对并生成待核查项。','由负责人确认判断，保留依据和处理记录。'],labels:['成分资料','规则核查','审核记录'],badge:'AI 辅助 · 人工确认'},
    {id:'huixiang',client:'汕头慧翔教育',theme:'education',title:'把师生管理，<br><em>放回一张图。</em>',summary:'连接师生、课程与服务记录，让日常安排和协作有据可查。',problem:'师生信息、课程与服务记录分散维护，日常安排与信息核对需要反复沟通。',approach:['整理师生、课程和服务记录的关联。','用管理系统承载安排、更新与查询。','围绕角色设计权限与流程，减少重复整理。'],labels:['师生信息','课程安排','服务记录'],badge:'师生 · 课程 · 记录'},
    {id:'modern-college',client:'山东现代学院',theme:'campus',title:'让竞赛申报，<br><em>有序推进。</em>',summary:'整理通知、申报材料与进度，让多人参与的申报流程形成闭环。',problem:'竞赛通知、参赛材料与处理状态由多人维护，重复填报和进度核对增加管理负担。',approach:['梳理竞赛、学生与申报材料之间的关系。','组织采集、材料检查和进度管理工作流。','统一查看待办和状态，按节点确认与推进。'],labels:['竞赛通知','申报材料','处理进度'],badge:'通知 → 材料 → 进度'}
  ];
  const caseGrid = document.querySelector('[data-case-grid]');
  if (caseGrid) caseGrid.innerHTML = caseData.map(c => `<article class="case-card case-${c.theme}"><div class="case-header"><span>${c.client}</span><span aria-hidden="true">↗</span></div><h3>${c.title}</h3><div class="case-visual" aria-hidden="true"><div class="case-mini-sheet"><strong>${c.client}</strong>${c.labels.map(t => `<div>${t}<i>整理</i></div>`).join('')}</div><span class="case-mini-label">${c.badge}</span></div><p>${c.summary}</p><button type="button" class="case-button" data-case="${c.id}" aria-label="查看${c.client}项目场景">看看方案思路 <span aria-hidden="true">↗</span></button></article>`).join('');

  const productPanel = document.querySelector('#product-panel');
  function renderProduct(key) {
    const p = productData[key] || productData.ai;
    productPanel.setAttribute('aria-labelledby', `tab-${key}`);
    productPanel.innerHTML = `<div class="product-feature"><div class="product-feature-copy"><span>${p.label}</span><h3>${p.title}</h3><p>${p.description}</p><a class="underlined-link" href="${root}assessment/?topic=${key}">先做一次自测 ↗</a></div><div class="product-materials">${p.materials.map(m => `<article class="material-row"><span class="material-icon" aria-hidden="true"></span><div><div class="material-title"><h4>${m.title}</h4><span>${m.tag}</span></div><p>${m.desc}</p><div class="material-actions"><a href="${root}assets/${m.file}" download>下载免费样本 ↓</a><button type="button" data-consult="${m.topic}">了解完整内容 ↗</button></div></div></article>`).join('')}</div></div><div class="product-support"><article class="support-tile"><span class="support-label">和同伴一起更新</span><h4>${p.community}</h4><button type="button" data-consult="${p.community}" aria-label="了解${p.community}">↗</button><p>${p.communityDesc}</p><button type="button" class="support-link" data-consult="${p.community}">了解加入方式</button></article><article class="support-tile"><span class="support-label">需要时，深入一点</span><h4>${p.consult}</h4><button type="button" data-consult="${p.consult}" aria-label="预约${p.consult}">↗</button><p>${p.consultDesc}</p><button type="button" class="support-link" data-consult="${p.consult}">预约专项咨询</button></article></div>`;
    document.querySelectorAll('[data-product]').forEach(b => { const active = b.dataset.product === key; b.setAttribute('aria-selected', String(active)); b.tabIndex = active ? 0 : -1; });
  }
  if (productPanel) {
    const initial = new URLSearchParams(location.search).get('product') || location.hash.replace('#','');
    renderProduct(productData[initial] ? initial : 'ai');
    const tabs = [...document.querySelectorAll('[data-product]')];
    tabs.forEach((button, index) => {
      button.addEventListener('click', () => renderProduct(button.dataset.product));
      button.addEventListener('keydown', e => {
        let next;
        if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (e.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {e.preventDefault(); tabs[next].focus(); renderProduct(tabs[next].dataset.product);}
      });
    });
  }
  const heroForm = document.querySelector('#hero-form');
  if (heroForm) {
    heroForm.addEventListener('submit', e => {
      e.preventDefault();
      const problem = heroForm.problem.value.trim();
      if (!problem) {heroForm.problem.setCustomValidity('请写下最近让你卡住的一件事。'); heroForm.problem.reportValidity(); return;}
      const topic = new FormData(heroForm).get('topic');
      try {sessionStorage.setItem('prism-question', JSON.stringify({problem,topic}));} catch { /* Assessment remains usable without storage. */ }
      location.href = `${root}assessment/?topic=${encodeURIComponent(topic)}`;
    });
    heroForm.problem.addEventListener('input', () => heroForm.problem.setCustomValidity(''));
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#mobile-nav');
  function closeMenu() {if (!toggle || !nav) return; nav.hidden = true; toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','展开导航');}
  toggle?.addEventListener('click', () => {const expanded = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded',String(expanded)); toggle.setAttribute('aria-label',expanded ? '收起导航' : '展开导航'); nav.hidden = !expanded;});
  nav?.addEventListener('click', e => {if (e.target.closest('a')) closeMenu();});
  document.addEventListener('keydown', e => {if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {closeMenu(); toggle.focus();}});
  window.matchMedia('(min-width:801px)').addEventListener('change', e => {if (e.matches) closeMenu();});

  const leadDialog = document.createElement('dialog');
  leadDialog.className = 'lead-dialog';
  leadDialog.setAttribute('aria-labelledby','lead-title');
  const serviceNames = page === 'enterprise' ? ['企业场景诊断','AI 实战培训','知识库与业务 Agent','SaaS 工作流改造','项目案例沟通'] : ['聊聊我的问题',...Object.values(productData).flatMap(p => [...p.materials.map(m => m.topic),p.community,p.consult]),'项目案例沟通'];
  leadDialog.innerHTML = `<div class="dialog-inner"><button type="button" class="dialog-close" data-close aria-label="关闭沟通窗口">×</button><p class="eyebrow">${page === 'enterprise' ? '企业与技术合作' : '从一个具体问题开始'}</p><h2 id="lead-title">${page === 'enterprise' ? '说说团队的业务问题。' : '你的下一步，可以聊得具体一点。'}</h2><p class="dialog-intro">生成一份简报，复制后添加微信 ${wechat} 发送给我。资料、社群与服务安排都可以在这里了解。</p><form class="lead-form"><div class="field-row"><div><label for="lead-name">称呼${page === 'enterprise' ? ' / 公司' : ''}（选填）</label><input id="lead-name" name="name" autocomplete="name" maxlength="60"></div><div><label for="lead-topic">想聊什么</label><select id="lead-topic" name="topic">${serviceNames.map(s => `<option>${s}</option>`).join('')}</select></div></div><label for="lead-problem">问题 / 想了解的内容 *</label><textarea id="lead-problem" name="problem" required maxlength="1200" placeholder="你想解决什么，或想先了解哪部分内容？"></textarea><label for="lead-context">背景与期待（选填）</label><input id="lead-context" name="context" maxlength="800"><button type="submit" class="button primary">生成沟通简报 <span aria-hidden="true">↗</span></button></form><p class="dialog-fine">内容在本页生成，不自动发送。复制到微信后才会发给我。</p><div class="brief-result" hidden><h3>简报准备好了，可以修改后发送。</h3><label for="brief-text">沟通简报</label><textarea id="brief-text" class="brief-output"></textarea><div class="dialog-actions"><button class="button primary" type="button" data-copy-brief>复制简报 ↗</button><button class="underlined-link" type="button" data-copy-wechat>复制微信号</button></div><p class="copy-feedback" role="status"></p></div></div>`;
  document.body.append(leadDialog);
  const caseDialog = document.createElement('dialog');
  caseDialog.className = 'case-dialog'; caseDialog.setAttribute('aria-labelledby','case-title');
  document.body.append(caseDialog);
  let opener;
  let currentAssessment;
  function openLead(topic, source) {
    if (caseDialog.open) caseDialog.close();
    opener = source;
    const select = leadDialog.querySelector('#lead-topic');
    if (topic && ![...select.options].some(o => o.value === topic)) select.add(new Option(topic,topic));
    select.value = topic || serviceNames[0];
    leadDialog.querySelector('.brief-result').hidden = true;
    leadDialog.querySelector('.copy-feedback').textContent = '';
    if (currentAssessment) {
      leadDialog.querySelector('#lead-problem').value = `${currentAssessment.problem}\n希望：${currentAssessment.goal}`.slice(0,1200);
      leadDialog.querySelector('#lead-context').value = `${currentAssessment.constraint}\n支持方式：${supportLabels[currentAssessment.support] || ''}`.slice(0,800);
    }
    leadDialog.showModal(); leadDialog.querySelector('#lead-problem').focus();
  }
  async function copyText(textValue) {
    try {if (navigator.clipboard && window.isSecureContext) {await navigator.clipboard.writeText(textValue); return true;}} catch { /* Fall through to manual-compatible copy. */ }
    const parent = leadDialog.open ? leadDialog : document.body;
    const input = document.createElement('textarea'); const active = document.activeElement;
    input.value = textValue; input.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0'; parent.append(input); input.select();
    let ok = false; try {ok = document.execCommand('copy');} catch {ok = false;}
    input.remove(); active?.focus(); return ok;
  }
  document.addEventListener('click', async e => {
    const consult = e.target.closest('[data-consult]');
    if (consult) {openLead(consult.dataset.consult, consult.closest('dialog') ? opener : consult); return;}
    const close = e.target.closest('[data-close]');
    if (close) {close.closest('dialog').close(); return;}
    const caseButton = e.target.closest('[data-case]');
    if (caseButton) {
      const c = caseData.find(x => x.id === caseButton.dataset.case); opener = caseButton;
      caseDialog.innerHTML = `<div class="dialog-inner"><button type="button" class="dialog-close" data-close aria-label="关闭案例详情">×</button><p class="eyebrow">项目场景与方案思路</p><h2 id="case-title">${c.client}</h2><div class="case-detail-block"><h3>业务问题</h3><p>${c.problem}</p></div><div class="case-detail-block"><h3>方案切入点</h3><ul>${c.approach.map(a => `<li>${a}</li>`).join('')}</ul></div><p class="case-dialog-note">这里呈现场景与方案思路，具体交付范围与可公开资料可进一步沟通。</p><button type="button" class="button primary" data-consult="项目案例沟通">聊聊我的类似场景 ↗</button></div>`;
      caseDialog.showModal(); return;
    }
    const copyWechat = e.target.closest('[data-copy-wechat]');
    if (copyWechat) {
      const ok = await copyText(wechat);
      const status = copyWechat.closest('dialog')?.querySelector('.copy-feedback') || copyWechat.closest('.connect-grid')?.querySelector('[data-copy-status]') || document.querySelector('#result-status');
      if (status) status.textContent = ok ? `已复制微信号：${wechat}` : `请手动复制微信号：${wechat}`;
      return;
    }
    const copyBrief = e.target.closest('[data-copy-brief]');
    if (copyBrief) {
      const field = leadDialog.querySelector('#brief-text');
      const ok = await copyText(field.value);
      leadDialog.querySelector('.copy-feedback').textContent = ok ? `已复制，添加微信 ${wechat} 后粘贴发送。` : '暂时无法自动复制，已选中简报，请手动复制。';
      if (!ok) {field.focus(); field.select();}
    }
  });
  leadDialog.addEventListener('close', () => {if (opener?.isConnected && !opener.closest('dialog')) opener.focus();});
  caseDialog.addEventListener('close', () => {if (!leadDialog.open && opener?.isConnected) opener.focus();});
  [leadDialog,caseDialog].forEach(dialog => {
    dialog.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const els = [...dialog.querySelectorAll('button,a[href],input,select,textarea')].filter(el => !el.disabled && el.getClientRects().length);
      if (e.shiftKey && document.activeElement === els[0]) {e.preventDefault(); els[els.length-1].focus();}
      else if (!e.shiftKey && document.activeElement === els[els.length-1]) {e.preventDefault(); els[0].focus();}
    });
    dialog.addEventListener('click', e => {if (e.target !== dialog) return; const r = dialog.getBoundingClientRect(); if (e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) dialog.close();});
  });
  leadDialog.querySelector('form').addEventListener('submit', e => {
    e.preventDefault(); const data = new FormData(e.target); const problem = String(data.get('problem') || '').trim();
    const field = leadDialog.querySelector('#lead-problem');
    if (!problem) {field.setCustomValidity('请写下一个问题，或想了解的内容。'); field.reportValidity(); return;}
    const lines = [`你好，我从棱镜轨迹${page==='enterprise' ? '企业合作页' : '主页 / 自测'}来。`,`想聊：${data.get('topic')}`,data.get('name')?.trim() ? `称呼：${data.get('name').trim()}` : '',`问题 / 想了解：${problem}`,data.get('context')?.trim() ? `背景与期待：${data.get('context').trim()}` : '', '想先了解内容、开放安排与合作方式。'].filter(Boolean);
    leadDialog.querySelector('#brief-text').value = lines.join('\n\n'); leadDialog.querySelector('.brief-result').hidden = false; leadDialog.querySelector('#brief-text').focus();
  });
  leadDialog.querySelector('#lead-problem').addEventListener('input', e => e.target.setCustomValidity(''));

  const supportLabels = {resources:'先拿资料，自己做',community:'和同伴一起学',consult:'聊一次具体问题',build:'实际搭建或持续陪跑'};
  const stageLabels = {starting:'刚开始，还在找方向',tried:'尝试过，但没形成方法',working:'已经在做，需要改进',review:'想找人 Review 一次'};
  const timeLabels = {small:'每周不到 2 小时',medium:'每周 2—5 小时',large:'每周 5 小时以上'};
  const assessmentForm = document.querySelector('#assessment-form');
  if (assessmentForm) {
    const storageKey = 'prism-assessment-v2';
    const steps = [...document.querySelectorAll('[data-step]')];
    const resultEl = document.querySelector('#assessment-result');
    const note = document.querySelector('[data-storage-note]');
    const status = document.querySelector('#storage-status');
    let currentStep = 0;
    let localAvailable = true;
    function collect() {return Object.fromEntries(new FormData(assessmentForm));}
    function save() {
      try {localStorage.setItem(storageKey, JSON.stringify({version:2,step:currentStep,answers:collect()}));}
      catch {localAvailable = false; note.textContent = '当前浏览器无法保存草稿。填写内容只在本页保留，刷新后可能丢失。';}
    }
    function setAnswers(answers) {
      for (const [name,value] of Object.entries(answers || {})) {
        const el = assessmentForm.elements.namedItem(name);
        if (el && typeof value === 'string') {
          if (name === 'support') {const radio = [...assessmentForm.querySelectorAll('[name="support"]')].find(r => r.value === value); if (radio) radio.checked = true;}
          else if (el.tagName === 'SELECT') {if ([...el.options].some(o => o.value === value)) el.value = value;}
          else if (typeof el.maxLength === 'number' && el.maxLength > 0) el.value = value.slice(0,el.maxLength);
        }
      }
    }
    function showStep(index, focus = false) {
      currentStep = Math.max(0,Math.min(2,index));
      steps.forEach((step,i) => step.hidden = i !== currentStep);
      document.querySelectorAll('[data-step-label]').forEach((li,i) => {li.classList.toggle('current',i===currentStep); li.classList.toggle('completed',i<currentStep); if(i===currentStep) li.setAttribute('aria-current','step'); else li.removeAttribute('aria-current');});
      document.querySelector('#assess-back').hidden = currentStep === 0;
      document.querySelector('#assess-next').hidden = currentStep === 2;
      document.querySelector('#assess-submit').hidden = currentStep !== 2;
      document.querySelector('#step-counter').textContent = `${currentStep+1} / 3`;
      document.querySelector('#assess-next').textContent = currentStep === 0 ? '继续，看见现状 ↗' : '继续，选择支持 ↗';
      if (focus) {const input = steps[currentStep].querySelector('input,select,textarea'); input?.focus(); steps[currentStep].scrollIntoView({behavior:'auto',block:'start'});}
    }
    function validateStep(index) {
      for (const el of steps[index].querySelectorAll('input,select,textarea')) {
        if (el.required && !String(el.value).trim()) el.setCustomValidity('请写几句话，帮助你理清这个问题。');
        if (!el.checkValidity()) {showStep(index); el.reportValidity(); return false;}
      }
      return true;
    }
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (saved?.version === 2 && saved.answers) {setAnswers(saved.answers); if ([0,1,2].includes(saved.step)) currentStep = saved.step;}
    } catch { /* Corrupt or unavailable storage should never block the form. */ }
    let incoming;
    try {incoming = JSON.parse(sessionStorage.getItem('prism-question') || 'null'); sessionStorage.removeItem('prism-question');} catch {}
    if (incoming && typeof incoming.problem === 'string' && topics[incoming.topic]) {setAnswers(incoming); currentStep=0;}
    const queryTopic = new URLSearchParams(location.search).get('topic');
    if (topics[queryTopic]) assessmentForm.elements.topic.value=queryTopic;
    showStep(currentStep); save();
    assessmentForm.addEventListener('input', e => {if (e.target.setCustomValidity) e.target.setCustomValidity(''); save();});
    assessmentForm.addEventListener('change', save);
    document.querySelector('#assess-next').addEventListener('click', () => {if(validateStep(currentStep)) {showStep(currentStep+1,true); save();}});
    document.querySelector('#assess-back').addEventListener('click', () => {showStep(currentStep-1,true); save();});
    assessmentForm.addEventListener('keydown', e => {if (e.key==='Enter' && e.target.tagName !== 'TEXTAREA' && currentStep<2) {e.preventDefault(); document.querySelector('#assess-next').click();}});
    function briefFor(a) {return [`你好，我做了棱镜轨迹的下一步自测。`,`方向：${topics[a.topic] || topics.unsure}`,`困扰：${a.problem}`,`希望：${a.goal}`,`现状：${stageLabels[a.stage] || ''}`,a.tried?.trim()?`尝试过：${a.tried}`:'',`约束：${a.constraint}`,`时间：${timeLabels[a.time] || ''}`,`需要的支持：${supportLabels[a.support] || ''}`,a.note?.trim()?`补充：${a.note}`:'','想先了解适合的资料、社群或咨询安排。'].filter(Boolean).join('\n\n');}
    function actionFor(a) {
      const actions = {
        ai:'列出三个经常重复的任务，只选一个。写清输入、输出和人工确认点，用一个真实样例试做，再记录耗时与返工。',
        invest:'选一个你关注的行业或问题，分别写下事实、判断与风险假设。为关键事实找到原始来源，确定下一次检查的时间。',
        career:'选一个目标岗位，列出三个核心要求。为每项要求找一个已有项目证据，再圈出最需要补齐的一项。',
        growth:'把希望发生的改变拆成一个本周能完成的动作。明确时间、完成标准，以及做完后如何复盘。',
        unsure:'写下最近反复出现的三个困扰，按影响和可行动程度排序。只选择其中一个，定义本周最小的一步。'
      };
      return actions[a.topic] + (a.time==='small' ? ' 先安排一次 30 分钟，完成其中最小的动作。' : a.time==='large' ? ' 为尝试与复盘各留一个固定时段。' : ' 给第一次尝试和一次反馈留出时间。');
    }
    function renderResult(a) {
      currentAssessment = a;
      const p = productData[a.topic] || productData.growth;
      const support = a.support;
      const titles = {resources:'先从一份可用的资料开始。',community:'找一个能一起讨论的环境。',consult:'带着这个问题，做一次专项诊断。',build:'先定义一个交付，再讨论怎样推进。'};
      const descriptions = {resources:'先用样本整理问题，验证方法是否适合你。完整资料的内容与更新范围，可以进一步了解。',community:'资料给你方法，同伴提供反馈。先了解讨论主题、参与方式与开放安排。',consult:'把目标、限制与已有尝试放到一起，检查思路和下一步。咨询范围、节奏与费用先沟通。',build:'先确认一个能检验的成果、人工判断点和反馈方式，再决定持续陪跑或定制搭建范围。'};
      resultEl.innerHTML = `<p class="eyebrow">按你填写的目标与偏好整理</p><h2 id="result-title" tabindex="-1">先把这一件事，<br><span class="serif-accent">往前推一步。</span></h2><p class="result-note">这是一份行动起点。可以修改简报，也可以先拿模板自己试试。</p><dl class="result-summary"><div><dt>你的困扰</dt><dd>${escapeHtml(a.problem)}</dd></div><div><dt>想要改变</dt><dd>${escapeHtml(a.goal)}</dd></div><div><dt>当前限制</dt><dd>${escapeHtml(a.constraint)}</dd></div><div><dt>支持方式</dt><dd>${escapeHtml(supportLabels[support])}</dd></div></dl><div class="first-action"><h3>本周可以做的一件事</h3><p>${actionFor(a)}</p></div><div class="result-next"><h3>${titles[support]}</h3><p>${descriptions[support]}</p><div class="result-links"><a href="${root}assets/${p.materials[0].file}" download>拿一份免费模板样本 <span aria-hidden="true">↓</span></a><a href="${root}#${a.topic==='unsure'?'growth':a.topic}">看看对应的资料与服务 <span aria-hidden="true">↗</span></a></div></div><label class="result-brief-label" for="result-brief">你的沟通简报（可以继续编辑）</label><textarea class="brief-output" id="result-brief"></textarea><div class="result-actions"><button class="button primary" type="button" id="copy-result">复制我的简报 ↗</button><button class="button secondary" type="button" id="download-result">保存自测结果 ↓</button><button class="button secondary" type="button" data-consult="${support==='community'?p.community:support==='resources'?p.materials[0].topic:p.consult}">了解${support==='community'?'社群安排':support==='resources'?'完整资料':'咨询方式'} ↗</button></div><p class="result-status" id="result-status" role="status"></p><div class="result-footer"><button class="underlined-link" type="button" data-copy-wechat>复制微信号 ${wechat}</button><button class="underlined-link muted-link" type="button" id="edit-result">修改我的填写</button></div>`;
      resultEl.querySelectorAll('.result-links a')[1].href = `${root}?product=${a.topic==='unsure'?'growth':a.topic}#products`;
      resultEl.querySelector('#result-brief').value=briefFor(a);
      assessmentForm.hidden=true; resultEl.hidden=false;
      document.querySelector('#result-title').focus(); resultEl.scrollIntoView({behavior:'auto',block:'start'});
      document.querySelector('#copy-result').addEventListener('click', async () => {const field=document.querySelector('#result-brief'); const ok=await copyText(field.value); document.querySelector('#result-status').textContent=ok?`已复制。添加微信 ${wechat} 后粘贴发送。`:'暂时无法自动复制，已选中简报，请手动复制。'; if(!ok){field.focus();field.select();}});
      document.querySelector('#download-result').addEventListener('click', () => {const text=`棱镜轨迹 · 下一步自测\n\n${document.querySelector('#result-brief').value}\n\n本周的一个动作：\n${actionFor(a)}\n\n网站：https://lazygrowth.top/\n微信：${wechat}\n`; const blob=new Blob([text],{type:'text/plain;charset=utf-8'}); const url=URL.createObjectURL(blob); const link=document.createElement('a'); link.href=url; link.download='棱镜轨迹_我的下一步.txt'; link.click(); URL.revokeObjectURL(url);});
      document.querySelector('#edit-result').addEventListener('click', () => {resultEl.hidden=true; assessmentForm.hidden=false; showStep(0,true); save();});
    }
    assessmentForm.addEventListener('submit', e => {e.preventDefault(); for(let i=0;i<steps.length;i++){if(!validateStep(i))return;} const a=collect(); save(); renderResult(a);});
    document.querySelector('#clear-draft').addEventListener('click', () => {
      assessmentForm.reset(); assessmentForm.querySelectorAll('input,textarea').forEach(el=>el.setCustomValidity(''));
      try {localStorage.removeItem(storageKey);sessionStorage.removeItem('prism-question');} catch {}
      currentAssessment=undefined; resultEl.innerHTML=''; resultEl.hidden=true; assessmentForm.hidden=false;
      showStep(0); status.textContent='填写内容已清除。'; document.querySelector('#assess-problem').focus();
      if(!localAvailable) note.textContent='当前浏览器无法保存草稿。填写内容只在本页保留。';
    });
  }
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
})();
