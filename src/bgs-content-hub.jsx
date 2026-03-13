import { useState, useEffect, useCallback } from "react";

const SK = "bgs-hub-v7";
const seed = {
  clients: [
    { id:"c1", name:"Supermercado Santa Helena", color:"#FF6B35", initials:"SH", emoji:"🛒", instagram:"@supermercadosantahelena", phone:"5541999001001", email:"contato@santahelena.com", segment:"Supermercado", contract:"3500", startDate:"2025-06-01" },
    { id:"c2", name:"Mademape", color:"#2ECC71", initials:"MA", emoji:"🪵", instagram:"@mademape", phone:"5541999002002", email:"contato@mademape.com", segment:"Madeireira", contract:"4500", startDate:"2025-08-15" },
    { id:"c3", name:"Dr. Elias Marcelo", color:"#3498DB", initials:"EM", emoji:"🦴", instagram:"@dr.eliasmarcelo", phone:"5541999003003", email:"elias@clinica.com", segment:"Saúde / Ortopedia", contract:"2800", startDate:"2025-10-01" },
    { id:"c4", name:"Joãozinho #33", color:"#F1C40F", initials:"J3", emoji:"🏁", instagram:"@joaozinhosantahelena33", phone:"5541999004004", email:"joaozinho@daf.com", segment:"Automobilismo", contract:"2000", startDate:"2026-01-01" },
    { id:"c5", name:"Fabrício #82", color:"#9B59B6", initials:"F8", emoji:"🏎️", instagram:"@fabriciorossatto82", phone:"5541999005005", email:"fabricio@daf.com", segment:"Automobilismo", contract:"2000", startDate:"2026-01-01" },
  ],
  posts: [
    { id:"p1",clientId:"c1",title:"Ofertas da Semana",date:"2026-03-16",type:"feed",status:"approved",caption:"Confira as ofertas imperdíveis desta semana! 🛒🔥",feedback:[],media:[],assignee:"t1",coverColor:"#FF6B35"},
    { id:"p2",clientId:"c1",title:"Mutirão do Emprego",date:"2026-03-18",type:"reels",status:"review",caption:"Venha participar do nosso Mutirão do Emprego! 💼",feedback:[{from:"cliente",text:"Pode trocar a foto de fundo?",at:"2026-03-12T10:30:00"}],media:[],assignee:"t1",coverColor:"#E74C3C"},
    { id:"p3",clientId:"c4",title:"Pré-corrida Santa Cruz",date:"2026-03-14",type:"stories",status:"approved",caption:"Amanhã tem corrida! Joãozinho #33 preparado 🏁",feedback:[],media:[],assignee:"t2",coverColor:"#F1C40F"},
    { id:"p4",clientId:"c5",title:"Bastidores Box #82",date:"2026-03-15",type:"reels",status:"draft",caption:"Bastidores da preparação do caminhão #82",feedback:[],media:[],assignee:"t7",coverColor:"#9B59B6"},
    { id:"p5",clientId:"c2",title:"Institucional Mademape",date:"2026-03-20",type:"feed",status:"changes",caption:"Conheça a Mademape: qualidade e tradição 🪵",feedback:[{from:"cliente",text:"Inclua o Luciano na foto.",at:"2026-03-11T14:00:00"}],media:[],assignee:"t3",coverColor:"#2ECC71"},
    { id:"p6",clientId:"c3",title:"Dicas de Postura",date:"2026-03-17",type:"carousel",status:"review",caption:"5 dicas do Dr. Elias para melhorar sua postura 🦴",feedback:[],media:[],assignee:"t4",coverColor:"#3498DB"},
    { id:"p7",clientId:"c2",title:"FEICON 2026",date:"2026-04-07",type:"feed",status:"draft",caption:"Mademape na FEICON! Mademape Financia 🏗️",feedback:[],media:[],assignee:"t5",coverColor:"#1ABC9C"},
    { id:"p8",clientId:"c1",title:"Hortifruti Fresquinho",date:"2026-03-22",type:"feed",status:"review",caption:"Hortifruti fresquinho todo dia! 🥬🍅",feedback:[],media:[],assignee:"t2",coverColor:"#27AE60"},
    { id:"p9",clientId:"c3",title:"Dor no Joelho",date:"2026-03-25",type:"reels",status:"draft",caption:"Quando a dor no joelho é sinal de algo sério?",feedback:[],media:[],assignee:"t7",coverColor:"#2980B9"},
    { id:"p10",clientId:"c4",title:"Resultado Santa Cruz",date:"2026-03-16",type:"feed",status:"draft",caption:"Resultado da etapa de Santa Cruz do Sul! 🏁",feedback:[],media:[],assignee:"t2",coverColor:"#E67E22"},
  ],
  brandCore: {
    c1:{persona:"Donas de casa classe C/D, Colombo, 30-55 anos.",competitors:"Condor, Festval, Muffato.",positioning:"Supermercado do bairro, preço justo.",products:"Hortifruti, padaria, açougue. Ofertas semanais."},
    c2:{persona:"Construtoras, arquitetos, marceneiros PR.",competitors:"Madeireira Gaúcha, Leo Madeiras.",positioning:"Tradição em madeira.",products:"Madeira, MDF, compensados. Mademape Financia."},
    c3:{persona:"Pacientes 35-65, dores articulares, Curitiba.",competitors:"Ortopedistas da região.",positioning:"Ortopedista que explica simples.",products:"Consultas, cirurgias, coluna, joelho."},
    c4:{persona:"Fãs Formula Truck, masc 25-50.",competitors:"Outros pilotos.",positioning:"Piloto #33, Colombo nas pistas.",products:"Bastidores, corridas, ativações."},
    c5:{persona:"Fãs Formula Truck, comunidade DAF.",competitors:"Outros pilotos.",positioning:"#82, nova geração.",products:"Corridas, bastidores, parcerias."},
  },
  team: [
    {id:"t0",name:"Brayan",role:"Diretor / Roteiros",color:"#1A1A2E",phone:"5541999990000",email:"brayan@bgsmarketing.com"},
    {id:"t1",name:"Ana",role:"Social Media",color:"#FF6B35",phone:"5541999990001",email:"ana@bgsmarketing.com"},
    {id:"t2",name:"Alice",role:"Design / Social Media",color:"#E74C3C",phone:"5541999990002",email:"alice@bgsmarketing.com"},
    {id:"t3",name:"Andressa",role:"Social Media",color:"#9B59B6",phone:"5541999990003",email:"andressa@bgsmarketing.com"},
    {id:"t4",name:"Gabi",role:"Design",color:"#3498DB",phone:"5541999990004",email:"gabi@bgsmarketing.com"},
    {id:"t5",name:"Rafael",role:"Design",color:"#2ECC71",phone:"5541999990005",email:"rafael@bgsmarketing.com"},
    {id:"t6",name:"Ketglin",role:"Tráfego Pago",color:"#F1C40F",phone:"5541999990006",email:"ketglin@bgsmarketing.com"},
    {id:"t7",name:"Raphael",role:"Videomaker",color:"#E67E22",phone:"5541999990007",email:"raphael@bgsmarketing.com"},
    {id:"t8",name:"Gabriele",role:"Social Media",color:"#1ABC9C",phone:"5541999990008",email:"gabriele@bgsmarketing.com"},
  ],
  notifications: [],
  demands: [
    { id:"d1", clientId:"c1", type:"feed", title:"Post ofertas semana 25/03", description:"Criar arte das ofertas de hortifruti da semana", assignee:"t4", status:"production", priority:"high", createdAt:"2026-03-10T09:00:00", deadline:"2026-03-14", files:[], links:[] },
    { id:"d2", clientId:"c2", type:"reels", title:"Vídeo institucional Luciano", description:"Gravar vídeo com Luciano falando sobre a Mademape", assignee:"t7", status:"new", priority:"high", createdAt:"2026-03-11T14:00:00", deadline:"2026-03-18", files:[], links:["https://drive.google.com/drive/folders/exemplo-mademape"] },
    { id:"d3", clientId:"c3", type:"carousel", title:"Carrossel dor lombar", description:"5 slides sobre prevenção de dor lombar", assignee:"t4", status:"review", priority:"medium", createdAt:"2026-03-09T10:00:00", deadline:"2026-03-16", files:[], links:[] },
    { id:"d4", clientId:"c4", type:"stories", title:"Stories pré-corrida", description:"Sequência de stories para a etapa de Cascavel", assignee:"t2", status:"done", priority:"medium", createdAt:"2026-03-08T16:00:00", deadline:"2026-03-13", files:[], links:[] },
    { id:"d5", clientId:"c1", type:"highlight", title:"Capa destaque Ofertas", description:"Nova capa de destaque para o highlight de ofertas", assignee:"t5", status:"new", priority:"low", createdAt:"2026-03-12T08:00:00", deadline:"2026-03-20", files:[], links:[] },
    { id:"d6", clientId:"c2", type:"feed", title:"Post FEICON teaser", description:"Arte teaser para a feira FEICON", assignee:"t4", status:"new", priority:"medium", createdAt:"2026-03-11T09:00:00", deadline:"2026-04-04", files:[], links:[] },
    { id:"d7", clientId:"c1", type:"reels", title:"Reels bastidores padaria", description:"Vídeo dos bastidores da padaria do mercado", assignee:"t7", status:"production", priority:"high", createdAt:"2026-03-10T11:00:00", deadline:"2026-03-15", files:[], links:[] },
  ],
};

/* Pode Postar style: status tags */
const ST = {
  draft:     { l:"Rascunho",    c:"#6B7280", bg:"#F3F4F6", border:"#E5E7EB" },
  review:    { l:"Em Aprovação", c:"#D97706", bg:"#FEF3C7", border:"#FDE68A" },
  changes:   { l:"Ajuste",      c:"#EA580C", bg:"#FFF7ED", border:"#FDBA74" },
  approved:  { l:"Aprovado",    c:"#16A34A", bg:"#DCFCE7", border:"#86EFAC" },
  published: { l:"Publicado",   c:"#7C3AED", bg:"#F3E8FF", border:"#C4B5FD" },
};
const TY = { feed:{l:"Feed",ic:"◼"}, reels:{l:"Reels",ic:"▶"}, stories:{l:"Stories",ic:"◉"}, carousel:{l:"Carrossel",ic:"◧"} };
const DT = { feed:{l:"Post Feed",ic:"🖼️"}, carousel:{l:"Carrossel",ic:"📑"}, reels:{l:"Reels / Vídeo",ic:"🎬"}, stories:{l:"Stories",ic:"📱"}, highlight:{l:"Capa Destaque",ic:"⭐"} };
const DS = {
  new:        { l:"Nova",          c:"#6366F1", bg:"#EEF2FF", border:"#C7D2FE" },
  production: { l:"Em Produção",   c:"#F59E0B", bg:"#FEF3C7", border:"#FDE68A" },
  review:     { l:"Revisão",       c:"#8B5CF6", bg:"#F3E8FF", border:"#C4B5FD" },
  done:       { l:"Pronta",        c:"#16A34A", bg:"#DCFCE7", border:"#86EFAC" },
};
const PRIO = { high:{l:"Alta",c:"#DC2626",bg:"#FEF2F2"}, medium:{l:"Média",c:"#F59E0B",bg:"#FEF3C7"}, low:{l:"Baixa",c:"#6B7280",bg:"#F3F4F6"} };
const MF = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

/* Datas comemorativas para Social Media */
const DATAS = {
  "01-01":"🎆 Ano Novo","01-25":"🎂 Aniv. São Paulo","01-30":"📱 Dia da Saudade",
  "02-14":"💘 Valentine's Day","02-22":"🎭 Dia do Carnaval",
  "03-08":"💜 Dia da Mulher","03-15":"👨‍👩‍👧 Dia do Consumidor","03-20":"🌸 Início do Outono","03-21":"🌳 Dia da Árvore","03-22":"💧 Dia da Água","03-27":"🎭 Dia do Teatro","03-29":"🐣 Sexta-feira Santa",
  "04-01":"😂 Dia da Mentira","04-07":"🇧🇷 Dia da Saúde","04-13":"🎸 Dia do Rock BR","04-15":"🎨 Dia da Arte","04-18":"📚 Dia do Livro","04-19":"🌎 Dia do Índio","04-20":"🐣 Páscoa","04-21":"🇧🇷 Tiradentes","04-22":"🌍 Dia da Terra","04-28":"🎓 Dia da Educação",
  "05-01":"👷 Dia do Trabalho","05-02":"💛 Dia do Ex","05-11":"🤱 Dia das Mães","05-13":"💛 Abolição","05-15":"👨‍👩‍👧‍👦 Dia da Família","05-17":"🌈 Dia contra Homofobia","05-25":"🏭 Dia da Indústria",
  "06-01":"👗 Dia do Estilista","06-05":"🌿 Dia do Meio Ambiente","06-12":"💑 Dia dos Namorados","06-15":"🎵 Dia do Músico","06-19":"🎬 Dia do Cinema","06-21":"❄️ Início do Inverno","06-24":"🎉 São João","06-29":"🐟 São Pedro",
  "07-02":"🏥 Dia do Bombeiro","07-08":"🧑‍🔬 Dia do Cientista","07-13":"🎸 Dia do Rock","07-20":"👫 Dia do Amigo","07-25":"✍️ Dia do Escritor","07-26":"🧓 Dia dos Avós",
  "08-05":"📸 Dia da Fotografia","08-10":"👨‍👩‍👧‍👦 Dia dos Pais","08-11":"👩‍🎓 Dia do Estudante","08-15":"🖥️ Dia da Informática","08-19":"🎭 Dia do Ator","08-22":"📢 Dia do Folclore","08-25":"🪖 Dia do Soldado","08-29":"🥗 Dia do Nutricionista",
  "09-01":"🏋️ Dia do Profissional de Ed. Física","09-05":"🌳 Dia da Amazônia","09-07":"🇧🇷 Independência","09-10":"💚 Prevenção ao Suicídio","09-15":"💚 Dia do Cliente","09-21":"🌳 Dia da Árvore","09-22":"🌺 Início Primavera","09-23":"🌺 Primavera","09-27":"🗼 Dia do Turismo",
  "10-01":"🎵 Dia da Música","10-04":"🐾 Dia dos Animais","10-05":"👩‍⚕️ Dia do Médico","10-10":"🧠 Saúde Mental","10-12":"👧 Dia das Crianças","10-15":"👩‍🏫 Dia do Professor","10-18":"🩺 Dia do Médico","10-28":"👩‍💼 Dia do Servidor","10-29":"📚 Dia do Livro","10-31":"🎃 Halloween",
  "11-01":"🕯️ Finados","11-10":"🌾 Dia do Trigo","11-15":"🇧🇷 Proclamação República","11-19":"🏳️ Dia da Bandeira","11-20":"✊ Consciência Negra","11-25":"🚫 Combate Violência Mulher","11-29":"🛒 Black Friday",
  "12-01":"🔴 Dia Mundial da AIDS","12-02":"🎅 Início Natal","12-08":"👨‍👩‍👧 Dia da Família","12-10":"🏅 Direitos Humanos","12-21":"☀️ Início Verão","12-24":"🎄 Véspera Natal","12-25":"🎄 Natal","12-31":"🎆 Réveillon",
};

/* Light theme palette */
const C = {
  bg:"#F8F9FB", white:"#FFFFFF", s1:"#F1F3F5", s2:"#E9ECEF",
  bd:"#E2E5EA", bd2:"#CED4DA",
  tx:"#1A1A2E", t2:"#495057", t3:"#868E96",
  ac:"#16A34A", ac2:"#22C55E", acBg:"#DCFCE7",
  or:"#EA580C", orBg:"#FFF7ED",
  rd:"#DC2626", rdBg:"#FEF2F2",
};

const injectCSS = () => {
  if (document.getElementById("bgs7")) return;
  const s = document.createElement("style");
  s.id = "bgs7";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    @keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes su{from{transform:translateY(100%)}to{transform:translateY(0)}}
    @keyframes sr{from{transform:translateX(100%)}to{transform:translateX(0)}}
    .bgs7 *{box-sizing:border-box;margin:0;padding:0}
    .bgs7{font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased;color:${C.tx};background:${C.bg}}
    .bgs7 ::-webkit-scrollbar{width:4px}.bgs7 ::-webkit-scrollbar-thumb{background:${C.bd};border-radius:4px}
    .bgs7 button,.bgs7 input,.bgs7 textarea,.bgs7 select{font-family:inherit}
    .fu{animation:fu .35s cubic-bezier(.22,1,.36,1) both}
    .su{animation:su .3s cubic-bezier(.22,1,.36,1) both}
    .sR{animation:sr .25s cubic-bezier(.22,1,.36,1) both}
    .lift{transition:transform .12s,box-shadow .12s}.lift:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,.08)}
    .tap{transition:transform .06s}.tap:active{transform:scale(.97)}
    .cal-cell{border-right:1px solid ${C.bd};border-bottom:1px solid ${C.bd};min-height:90px;padding:4px;vertical-align:top}
    .cal-cell:last-child{border-right:none}
  `;
  document.head.appendChild(s);
};

function useMob() {
  const [m, setM] = useState(window.innerWidth < 700);
  useEffect(() => { const h = () => setM(window.innerWidth < 700); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return m;
}

const inp = { width:"100%", padding:"10px 14px", borderRadius:10, border:`1.5px solid ${C.bd}`, background:C.white, color:C.tx, fontSize:14, outline:"none", boxSizing:"border-box" };

function Tag({ status, small }) {
  const s = ST[status]; if (!s) return null;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, padding: small ? "2px 8px" : "3px 12px", borderRadius:8, background:s.bg, color:s.c, fontSize: small ? 9 : 11, fontWeight:700, border:`1px solid ${s.border}`, whiteSpace:"nowrap" }}>
      {s.l}
    </span>
  );
}

function Av({ name, color, size = 36 }) {
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", flexShrink:0, background:`${color}18`, border:`2px solid ${color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize: size * 0.35, fontWeight:800, color }}>
      {(name || "").split(" ").map(w => w[0]).join("").slice(0, 2)}
    </div>
  );
}

function Sheet({ children, onClose, title }) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.4)", backdropFilter:"blur(4px)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:200 }}>
      <div onClick={e => e.stopPropagation()} className="su" style={{ width:"100%", maxWidth:520, maxHeight:"92vh", overflowY:"auto", borderRadius:"20px 20px 0 0", background:C.white, boxShadow:"0 -4px 30px rgba(0,0,0,.1)" }}>
        <div style={{ padding:"12px 0 0", display:"flex", justifyContent:"center" }}>
          <div style={{ width:36, height:4, borderRadius:2, background:C.bd2 }} />
        </div>
        {title && (
          <div style={{ padding:"14px 20px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${C.bd}` }}>
            <h3 style={{ fontSize:17, fontWeight:800 }}>{title}</h3>
            <button onClick={onClose} style={{ width:30, height:30, borderRadius:8, background:C.s1, border:`1px solid ${C.bd}`, color:C.t3, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>✕</button>
          </div>
        )}
        <div style={{ padding:"16px 20px 28px" }}>{children}</div>
      </div>
    </div>
  );
}

function Lbl({ children }) {
  return <div style={{ fontSize:11, fontWeight:700, color:C.t3, marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>{children}</div>;
}

/* Media Viewer */
function MediaView({ media, color }) {
  const [idx, setIdx] = useState(0);
  if (!media?.length) return (
    <div style={{ background:C.s1, borderRadius:14, padding:32, textAlign:"center", border:`1.5px dashed ${C.bd2}` }}>
      <div style={{ fontSize:36, opacity:0.3 }}>🖼️</div>
      <div style={{ fontSize:12, color:C.t3, marginTop:4 }}>Nenhuma mídia</div>
    </div>
  );
  const cur = media[idx] || media[0];
  const isV = cur?.type?.startsWith("video/");
  return (
    <div>
      <div style={{ borderRadius:14, overflow:"hidden", border:`1px solid ${C.bd}`, background:"#000", position:"relative" }}>
        {isV
          ? <video src={cur.data} controls playsInline style={{ width:"100%", maxHeight:360, display:"block", objectFit:"contain" }} />
          : <img src={cur.data} alt="" style={{ width:"100%", maxHeight:360, display:"block", objectFit:"contain" }} />
        }
        {media.length > 1 && (
          <div style={{ position:"absolute", top:8, right:8, fontSize:10, color:"#fff", fontWeight:700, background:"rgba(0,0,0,.5)", padding:"2px 8px", borderRadius:8 }}>{idx + 1}/{media.length}</div>
        )}
      </div>
      {media.length > 1 && (
        <div style={{ display:"flex", gap:6, marginTop:8, overflowX:"auto" }}>
          {media.map((m, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ width:48, height:48, borderRadius:8, flexShrink:0, overflow:"hidden", cursor:"pointer", border: idx === i ? `2px solid ${C.ac}` : `1px solid ${C.bd}`, background:"#000" }}>
              {m.type?.startsWith("video/")
                ? <video src={m.data} muted style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : <img src={m.data} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Media Uploader */
function MediaUp({ media, onChange, max = 10 }) {
  const [drag, setDrag] = useState(false);
  const [uid] = useState("u" + Math.random().toString(36).slice(2, 7));
  const proc = files => {
    Array.from(files).slice(0, max - (media?.length || 0)).forEach(f => {
      const r = new FileReader();
      r.onload = e => onChange(prev => [...(prev || []), { type: f.type, name: f.name, data: e.target.result }]);
      r.readAsDataURL(f);
    });
  };
  return (
    <div>
      <Lbl>{"📎 Mídias (" + (media?.length || 0) + "/" + max + ")"}</Lbl>
      {media?.length > 0 && (
        <div style={{ display:"flex", gap:6, marginBottom:10, overflowX:"auto" }}>
          {media.map((m, i) => (
            <div key={i} style={{ position:"relative", width:56, height:56, borderRadius:10, overflow:"hidden", flexShrink:0, border:`1px solid ${C.bd}`, background:"#000" }}>
              {m.type?.startsWith("video/")
                ? <video src={m.data} muted style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : <img src={m.data} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              }
              <button onClick={() => onChange(prev => prev.filter((_, j) => j !== i))} style={{ position:"absolute", top:2, right:2, width:16, height:16, borderRadius:4, background:"rgba(0,0,0,.6)", border:"none", color:"#fff", fontSize:8, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>✕</button>
            </div>
          ))}
        </div>
      )}
      {(media?.length || 0) < max && (
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); proc(e.dataTransfer.files); }}
          onClick={() => document.getElementById(uid)?.click()}
          style={{ padding:"16px", borderRadius:12, textAlign:"center", cursor:"pointer", border:`1.5px dashed ${drag ? C.ac : C.bd2}`, background: drag ? C.acBg : C.s1 }}
        >
          <div style={{ fontSize:18, opacity:0.4 }}>{drag ? "📥" : "📤"}</div>
          <div style={{ fontSize:12, fontWeight:600, color: drag ? C.ac : C.t2, marginTop:2 }}>{drag ? "Solte aqui!" : "Enviar mídia"}</div>
          <input id={uid} type="file" accept="image/*,video/*" multiple onChange={e => { proc(e.target.files); e.target.value = ""; }} style={{ display:"none" }} />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════ MAIN APP ═══════════════════════════ */
export default function App() {
  const mob = useMob();
  const [data, setData] = useState(null);
  const [ld, setLd] = useState(true);
  const [view, setView] = useState("cal");
  const [selC, setSelC] = useState(null);
  const [selP, setSelP] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [mo, setMo] = useState(new Date(2026, 2, 1));
  const [bTab, setBTab] = useState("persona");
  const [bEd, setBEd] = useState(false);
  const [bDr, setBDr] = useState({});
  const [picker, setPicker] = useState(false);
  const [addCl, setAddCl] = useState(false);
  const [nc, setNc] = useState({ name:"", color:"#3498DB", instagram:"", phone:"", email:"", segment:"", contract:"", startDate:"" });
  const [stFilt, setStFilt] = useState(null);
  const [portal, setPortal] = useState(null);
  const [copied, setCopied] = useState(null);
  const [fb, setFb] = useState("");
  const [notifs, setNotifs] = useState(false);
  const [search, setSearch] = useState("");
  const [demView, setDemView] = useState("kanban");
  const [showNewDem, setShowNewDem] = useState(false);
  const [calView, setCalView] = useState("monthly");

  useEffect(() => { injectCSS(); }, []);
  useEffect(() => {
    (async () => {
      try { const r = await window.storage.get(SK); if (r?.value) setData({ ...seed, ...JSON.parse(r.value) }); else setData(seed); } catch { setData(seed); }
      setLd(false);
    })();
  }, []);
  const sv = useCallback(async d => { setData(d); try { await window.storage.set(SK, JSON.stringify(d)); } catch (e) { console.error(e); } }, []);

  if (ld || !data) return (
    <div className="bgs7" style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:48, height:48, borderRadius:14, background:`linear-gradient(135deg,${C.ac},${C.ac2})`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontSize:20, fontWeight:900, color:"#fff" }}>B</div>
        <div style={{ fontSize:13, color:C.t3 }}>Carregando...</div>
      </div>
    </div>
  );

  if (portal) return <PortalView cid={portal} data={data} onSave={sv} onBack={() => setPortal(null)} />;

  const { clients, posts, team } = data;
  let fil = selC ? posts.filter(p => p.clientId === selC) : posts;
  if (stFilt) fil = fil.filter(p => p.status === stFilt);
  if (search) fil = fil.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  const curC = clients.find(c => c.id === selC);

  const upSt = (id, s) => sv({ ...data, posts: data.posts.map(p => p.id === id ? { ...p, status: s } : p) });
  const addP = p => { sv({ ...data, posts: [...data.posts, { id:"p" + Date.now(), ...p, feedback:[], media: p.media || [], coverColor: clients.find(c => c.id === p.clientId)?.color || C.ac }] }); setShowNew(false); };
  const addFb = (pid, txt) => sv({ ...data, posts: data.posts.map(p => p.id === pid ? { ...p, feedback: [...p.feedback, { from:"equipe", text:txt, at:new Date().toISOString() }] } : p) });
  const delP = id => { sv({ ...data, posts: data.posts.filter(p => p.id !== id) }); setSelP(null); };
  const savBr = (cid, f, val) => sv({ ...data, brandCore: { ...data.brandCore, [cid]: { ...(data.brandCore[cid] || {}), [f]: val } } });
  const addCli = () => { if (!nc.name.trim()) return; const id = "c" + Date.now(); sv({ ...data, clients: [...data.clients, { id, name: nc.name, color: nc.color, initials: nc.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(), emoji:"", instagram: nc.instagram, phone: nc.phone, email: nc.email, segment: nc.segment, contract: nc.contract, startDate: nc.startDate }] }); setNc({ name:"", color:"#3498DB", instagram:"", phone:"", email:"", segment:"", contract:"", startDate:"" }); setAddCl(false); setSelC(id); setPicker(false); };

  const nots = data.notifications || [];
  const unread = nots.filter(n => !n.read).length;
  const markR = nid => sv({ ...data, notifications: nots.map(n => n.id === nid ? { ...n, read: true } : n) });
  const markAll = () => sv({ ...data, notifications: nots.map(n => ({ ...n, read: true })) });
  const waLink = n => { const a = team.find(t => t.id === n.assigneeId); return a?.phone ? `https://wa.me/${a.phone}?text=${encodeURIComponent(`🔄 Ajuste\n📋 ${n.postTitle}\n👤 ${n.clientName}\n💬 "${n.message}"`)}` : null; };
  const emLink = n => { const a = team.find(t => t.id === n.assigneeId); return a?.email ? `mailto:${a.email}?subject=${encodeURIComponent(`Ajuste: ${n.postTitle}`)}&body=${encodeURIComponent(`${n.clientName} pediu ajuste:\n"${n.message}"`)}` : null; };

  /* Demand handlers */
  const demands = data.demands || [];
  const addDem = d => { sv({ ...data, demands: [...demands, { id:"d" + Date.now(), ...d, files: d.files || [], links: d.links || [], createdAt: new Date().toISOString() }] }); setShowNewDem(false); };
  const upDemSt = (id, s) => {
    let newData = { ...data, demands: demands.map(d => d.id === id ? { ...d, status: s } : d) };
    /* Auto-create post when demand is marked as "done" */
    if (s === "done") {
      const dem = demands.find(d => d.id === id);
      if (dem) {
        const exists = data.posts.some(p => p.title === dem.title && p.clientId === dem.clientId);
        if (!exists) {
          const typeMap = { feed:"feed", carousel:"carousel", reels:"reels", stories:"stories", highlight:"feed" };
          const newPost = {
            id: "p" + Date.now(), clientId: dem.clientId,
            title: dem.title, date: dem.deadline || new Date().toISOString().slice(0, 10),
            type: typeMap[dem.type] || "feed", status: "review",
            caption: dem.description || "", feedback: [], media: dem.files || [],
            assignee: dem.assignee, coverColor: clients.find(c => c.id === dem.clientId)?.color || C.ac,
          };
          newData = { ...newData, posts: [...newData.posts, newPost] };
        }
      }
    }
    sv(newData);
  };
  const delDem = id => sv({ ...data, demands: demands.filter(d => d.id !== id) });
  const demByClient = selC ? demands.filter(d => d.clientId === selC) : demands;

  /* Calendar helpers */
  const dim = new Date(mo.getFullYear(), mo.getMonth() + 1, 0).getDate();
  const fd = new Date(mo.getFullYear(), mo.getMonth(), 1).getDay();
  const dS = d => `${mo.getFullYear()}-${String(mo.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  /* Status counters */
  const allFiltered = selC ? posts.filter(p => p.clientId === selC) : posts;
  const cts = {};
  Object.keys(ST).forEach(k => { cts[k] = allFiltered.filter(p => p.status === k).length; });

  return (
    <div className="bgs7" style={{ display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden" }}>

      {/* ═══ HEADER ═══ */}
      <header style={{ padding: mob ? "10px 14px" : "10px 20px", display:"flex", alignItems:"center", gap:10, borderBottom:`1px solid ${C.bd}`, background:C.white, flexShrink:0, zIndex:10 }}>
        <div style={{ width:32, height:32, borderRadius:10, background:`linear-gradient(135deg,${C.ac},${C.ac2})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14, color:"#fff" }}>B</div>
        <div style={{ flex:1 }}>
          <span style={{ fontWeight:800, fontSize:15 }}>BGS Hub</span>
        </div>
        {/* Bell */}
        <button onClick={() => setNotifs(true)} className="tap" style={{ position:"relative", width:34, height:34, borderRadius:10, background: unread > 0 ? C.rdBg : C.s1, border:`1px solid ${unread > 0 ? "#FECACA" : C.bd}`, color: unread > 0 ? C.rd : C.t3, fontSize:15, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
          🔔
          {unread > 0 && <div style={{ position:"absolute", top:-4, right:-4, width:16, height:16, borderRadius:"50%", background:C.rd, color:"#fff", fontSize:8, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{unread}</div>}
        </button>
        {/* Client pill */}
        <button onClick={() => setPicker(true)} className="tap" style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", borderRadius:20, border:`1.5px solid ${C.bd}`, background:C.white, fontSize:12, fontWeight:600, color:C.tx, cursor:"pointer" }}>
          {curC ? <Av name={curC.name} color={curC.color} size={20} /> : <span style={{ fontSize:12 }}>🌐</span>}
          <span style={{ maxWidth: mob ? 60 : 100, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{curC ? curC.name : "Todos"}</span>
          <span style={{ color:C.t3, fontSize:8 }}>▼</span>
        </button>
      </header>

      {/* ═══ MAIN ═══ */}
      <main style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}>

        {/* ═══ CALENDAR ═══ */}
        {view === "cal" && (
          <div style={{ padding: mob ? 14 : 20 }}>
            {/* Month nav + status counters */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <button onClick={() => setMo(new Date(mo.getFullYear(), mo.getMonth() - 1, 1))} className="tap" style={{ width:32, height:32, borderRadius:8, background:C.white, border:`1px solid ${C.bd}`, color:C.t2, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>‹</button>
                <span style={{ fontSize:15, fontWeight:800, minWidth:130, textAlign:"center" }}>{MF[mo.getMonth()]} {mo.getFullYear()}</span>
                <button onClick={() => setMo(new Date(mo.getFullYear(), mo.getMonth() + 1, 1))} className="tap" style={{ width:32, height:32, borderRadius:8, background:C.white, border:`1px solid ${C.bd}`, color:C.t2, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>›</button>
              </div>
              {/* Status counters like Pode Postar */}
              <div style={{ display:"flex", gap:10 }}>
                {Object.entries(ST).map(([k, s]) => (
                  <div key={k} onClick={() => setStFilt(stFilt === k ? null : k)} style={{ textAlign:"center", cursor:"pointer", opacity: stFilt && stFilt !== k ? 0.4 : 1, transition:"opacity .2s" }}>
                    <div style={{ fontSize:18, fontWeight:900, color:s.c }}>{cts[k] || 0}</div>
                    <div style={{ fontSize:9, fontWeight:600, color:s.c }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* View tabs: Semanal / Mensal */}
            <div style={{ display:"flex", gap:4, marginBottom:14 }}>
              {[{id:"weekly",l:"📋 Semanal"},{id:"monthly",l:"📅 Mensal"}].map(v => (
                <button key={v.id} onClick={() => setCalView(v.id)} className="tap" style={{
                  padding:"7px 14px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer",
                  border: calView === v.id ? `2px solid ${C.ac}` : `1.5px solid ${C.bd}`,
                  background: calView === v.id ? C.acBg : C.white,
                  color: calView === v.id ? C.ac : C.t3,
                }}>{v.l}</button>
              ))}
            </div>

            {/* Search + actions */}
            <div style={{ display:"flex", gap:8, marginBottom:14 }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Buscar por título..." style={{ ...inp, flex:1, fontSize:13, padding:"8px 14px" }} />
              <button onClick={() => setShowNew(true)} className="tap" style={{ padding:"8px 16px", borderRadius:10, background:C.ac, border:"none", color:"#fff", fontWeight:700, fontSize:12, whiteSpace:"nowrap", cursor:"pointer" }}>+ Nova Aprovação</button>
            </div>

            {/* Client link */}
            {selC && (
              <div style={{ display:"flex", gap:6, marginBottom:14 }}>
                <button onClick={() => setPortal(selC)} className="tap" style={{ flex:1, padding:8, borderRadius:8, background:C.acBg, border:`1px solid ${C.ac}30`, color:C.ac, fontWeight:600, fontSize:11, cursor:"pointer" }}>👁️ Portal Cliente</button>
                <button onClick={() => { navigator.clipboard?.writeText(`${location.origin}${location.pathname}?portal=${selC}`); setCopied(selC); setTimeout(() => setCopied(null), 2000); }} className="tap" style={{ flex:1, padding:8, borderRadius:8, background:C.white, border:`1px solid ${C.bd}`, color: copied === selC ? C.ac : C.t3, fontWeight:600, fontSize:11, cursor:"pointer" }}>
                  {copied === selC ? "✅ Copiado!" : "🔗 Copiar link"}
                </button>
              </div>
            )}

            {/* ═══ WEEKLY VIEW ═══ */}
            {calView === "weekly" && (() => {
              const today = new Date(2026, 2, 12);
              const dayOfWeek = today.getDay();
              const weekStart = new Date(today); weekStart.setDate(today.getDate() - dayOfWeek);
              const weekDays = Array.from({ length: 7 }, (_, i) => {
                const d = new Date(weekStart); d.setDate(weekStart.getDate() + i); return d;
              });
              const dayNames = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
              return (
                <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.bd}`, overflow:"hidden" }}>
                  {weekDays.map((wd, wi) => {
                    const dateStr = `${wd.getFullYear()}-${String(wd.getMonth() + 1).padStart(2, "0")}-${String(wd.getDate()).padStart(2, "0")}`;
                    const dayPosts = fil.filter(p => p.date === dateStr);
                    const isToday = wd.getDate() === 12 && wd.getMonth() === 2;
                    const mmdd = `${String(wd.getMonth() + 1).padStart(2, "0")}-${String(wd.getDate()).padStart(2, "0")}`;
                    const comem = DATAS[mmdd];
                    return (
                      <div key={wi} style={{ borderBottom: wi < 6 ? `1px solid ${C.bd}` : "none", padding:"10px 14px", background: isToday ? "#F0FDF4" : C.white }}>
                        {/* Day header */}
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom: dayPosts.length > 0 || comem ? 8 : 0 }}>
                          <div style={{ width:40, textAlign:"center" }}>
                            <div style={{ fontSize:10, fontWeight:600, color:C.t3, textTransform:"uppercase" }}>{dayNames[wi]}</div>
                            <div style={{ fontSize:20, fontWeight:800, color: isToday ? C.ac : C.tx }}>{wd.getDate()}</div>
                          </div>
                          {isToday && <span style={{ fontSize:9, fontWeight:700, color:C.ac, background:C.acBg, padding:"2px 8px", borderRadius:6 }}>HOJE</span>}
                          {comem && <span style={{ fontSize:9, fontWeight:600, color:"#92400E", background:"#FEF3C7", padding:"2px 8px", borderRadius:6, border:"1px solid #FDE68A" }}>{comem}</span>}
                          <div style={{ flex:1 }} />
                          {dayPosts.length > 0 && <span style={{ fontSize:10, fontWeight:700, color:C.t3 }}>{dayPosts.length} post{dayPosts.length !== 1 ? "s" : ""}</span>}
                        </div>
                        {/* Posts */}
                        {dayPosts.map(post => {
                          const cl = clients.find(c => c.id === post.clientId);
                          const st = ST[post.status];
                          return (
                            <div key={post.id} onClick={() => setSelP(post)} className="lift" style={{
                              display:"flex", alignItems:"center", gap:10, padding:"8px 10px",
                              background:st.bg, borderRadius:8, borderLeft:`3px solid ${st.c}`,
                              marginBottom:4, cursor:"pointer", marginLeft:48,
                            }}>
                              <div style={{ flex:1, minWidth:0 }}>
                                <div style={{ fontSize:12, fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{post.title}</div>
                                <div style={{ fontSize:10, color:C.t3 }}>{cl?.name} · {TY[post.type]?.l}</div>
                              </div>
                              <Tag status={post.status} small />
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* ═══ MONTHLY GRID (Pode Postar style) ═══ */}
            {calView === "monthly" && (
            <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.bd}`, overflow:"hidden" }}>
              {/* Day headers */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", borderBottom:`1px solid ${C.bd}` }}>
                {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map((d, i) => (
                  <div key={i} style={{ padding:"8px 4px", textAlign:"center", fontSize:11, fontWeight:700, color:C.t3, background:C.s1 }}>{d}</div>
                ))}
              </div>
              {/* Day cells */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
                {/* Empty cells for offset */}
                {Array.from({ length: fd }, (_, i) => (
                  <div key={"e" + i} style={{ minHeight: mob ? 60 : 100, borderRight:`1px solid ${C.bd}`, borderBottom:`1px solid ${C.bd}`, background:C.s1 }} />
                ))}
                {/* Day cells with content */}
                {Array.from({ length: dim }, (_, i) => {
                  const day = i + 1;
                  const dateStr = dS(day);
                  const dayPosts = fil.filter(p => p.date === dateStr);
                  const today = dateStr === "2026-03-12";
                  const mmdd = `${String(mo.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const comem = DATAS[mmdd];
                  return (
                    <div key={day} style={{ minHeight: mob ? 60 : 100, borderRight:`1px solid ${C.bd}`, borderBottom:`1px solid ${C.bd}`, padding:3, background: today ? "#F0FDF4" : comem ? "#FFFBEB" : C.white, position:"relative" }}>
                      {/* Day number */}
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:2, paddingLeft:2, paddingRight:2 }}>
                        <span style={{ fontSize:11, fontWeight: today ? 800 : 500, color: today ? C.ac : C.t3 }}>{day}</span>
                        {today && <span style={{ fontSize:7, fontWeight:700, color:C.ac, background:C.acBg, padding:"0 4px", borderRadius:4 }}>HOJE</span>}
                      </div>
                      {/* Commemorative date */}
                      {comem && (
                        <div style={{
                          fontSize: mob ? 7 : 8, fontWeight:600, color:"#92400E",
                          background:"#FEF3C7", borderRadius:3, padding:"1px 4px",
                          marginBottom:2, overflow:"hidden", textOverflow:"ellipsis",
                          whiteSpace:"nowrap", border:"1px solid #FDE68A",
                        }}>
                          {comem}
                        </div>
                      )}
                      {/* Posts in this day */}
                      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                        {dayPosts.slice(0, mob ? 2 : 3).map(post => {
                          const hasMed = post.media?.length > 0;
                          const st = ST[post.status];
                          return (
                            <div key={post.id} onClick={() => setSelP(post)} style={{
                              padding: mob ? "2px 3px" : "2px 5px", borderRadius:4,
                              background:st.bg, borderLeft:`3px solid ${st.c}`,
                              cursor:"pointer", overflow:"hidden", position:"relative",
                            }}>
                              {/* Thumbnail if media exists */}
                              {hasMed && !mob && (
                                <div style={{ width:22, height:22, borderRadius:3, overflow:"hidden", float:"right", marginLeft:3, marginBottom:1, border:`1px solid ${C.bd}` }}>
                                  {post.media[0].type?.startsWith("video/")
                                    ? <video src={post.media[0].data} muted style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                                    : <img src={post.media[0].data} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                                  }
                                </div>
                              )}
                              <div style={{ fontSize: mob ? 8 : 9, fontWeight:600, color:st.c, lineHeight:1.3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                                {TY[post.type]?.l}
                              </div>
                              {!mob && (
                                <div style={{ fontSize:8, color:C.t2, lineHeight:1.2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                                  {post.title}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {dayPosts.length > (mob ? 2 : 3) && (
                          <div style={{ fontSize:8, color:C.t3, paddingLeft:3 }}>+{dayPosts.length - (mob ? 2 : 3)} mais</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            )}
          </div>
        )}

        {/* ═══ BRAND CORE ═══ */}
        {view === "brand" && (
          <div style={{ padding: mob ? 14 : 20 }}>
            <h1 className="fu" style={{ fontSize: mob ? 20 : 24, fontWeight:800, marginBottom:4 }}>Brand Core</h1>
            <p className="fu" style={{ fontSize:12, color:C.t3, marginBottom:18 }}>{selC ? curC?.name : "Selecione um cliente"}</p>
            {selC ? (
              <>
                <div className="fu" style={{ display:"flex", gap:6, marginBottom:18, overflowX:"auto" }}>
                  {[{id:"persona",l:"🎯 Persona"},{id:"competitors",l:"🕵️ Concorrência"},{id:"positioning",l:"🧭 Posicionamento"},{id:"products",l:"📦 Produtos"}].map(t => (
                    <button key={t.id} onClick={() => { setBTab(t.id); setBEd(false); }} className="tap" style={{
                      padding:"8px 14px", borderRadius:10, whiteSpace:"nowrap", fontSize:12, fontWeight:600,
                      border: bTab === t.id ? `2px solid ${C.ac}` : `1.5px solid ${C.bd}`,
                      background: bTab === t.id ? C.acBg : C.white,
                      color: bTab === t.id ? C.ac : C.t2, cursor:"pointer",
                    }}>{t.l}</button>
                  ))}
                </div>
                <div className="fu" style={{ background:C.white, borderRadius:14, border:`1px solid ${C.bd}`, padding: mob ? 16 : 24 }}>
                  {bEd ? (
                    <>
                      <textarea value={bDr[bTab] || ""} onChange={e => setBDr({ ...bDr, [bTab]: e.target.value })} rows={8} style={{ ...inp, minHeight:160, resize:"vertical", lineHeight:1.7 }} />
                      <div style={{ display:"flex", gap:8, marginTop:12 }}>
                        <button onClick={() => { savBr(selC, bTab, bDr[bTab]); setBEd(false); }} className="tap" style={{ padding:"10px 20px", borderRadius:10, background:C.ac, color:"#fff", border:"none", fontWeight:700, fontSize:13, cursor:"pointer" }}>Salvar</button>
                        <button onClick={() => setBEd(false)} className="tap" style={{ padding:"10px 16px", borderRadius:10, background:C.s1, border:`1px solid ${C.bd}`, color:C.t2, fontWeight:600, cursor:"pointer" }}>Cancelar</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                        <h3 style={{ fontSize:16, fontWeight:800 }}>{{persona:"🎯 Persona",competitors:"🕵️ Concorrência",positioning:"🧭 Posicionamento",products:"📦 Produtos"}[bTab]}</h3>
                        <button onClick={() => { setBDr({ ...bDr, [bTab]: data.brandCore[selC]?.[bTab] || "" }); setBEd(true); }} className="tap" style={{ padding:"6px 14px", borderRadius:8, background:C.s1, border:`1px solid ${C.bd}`, color:C.t2, fontSize:11, fontWeight:600, cursor:"pointer" }}>✏️ Editar</button>
                      </div>
                      <div style={{ fontSize:14, color:C.t2, lineHeight:1.7, whiteSpace:"pre-wrap", background:C.s1, borderRadius:10, padding:16, border:`1px solid ${C.bd}` }}>
                        {data.brandCore[selC]?.[bTab] || <span style={{ color:C.t3, fontStyle:"italic" }}>Nenhuma informação.</span>}
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="fu" style={{ textAlign:"center", padding:40, color:C.t3 }}>
                <div style={{ fontSize:40, marginBottom:12 }}>🎯</div>
                <p style={{ fontWeight:700 }}>Selecione um cliente</p>
              </div>
            )}
          </div>
        )}

        {/* ═══ TEAM ═══ */}
        {view === "team" && (
          <div style={{ padding: mob ? 14 : 20 }}>
            <h1 className="fu" style={{ fontSize: mob ? 20 : 24, fontWeight:800, marginBottom:4 }}>Equipe</h1>
            <p className="fu" style={{ fontSize:12, color:C.t3, marginBottom:18 }}>Gestão de equipe e carga de trabalho</p>

            {/* Team overview cards */}
            {team.map((t, i) => {
              const memberPosts = posts.filter(p => p.assignee === t.id);
              const memberDemands = demands.filter(d => d.assignee === t.id && d.status !== "done");
              const overdueDemands = memberDemands.filter(d => d.deadline && new Date(d.deadline) < new Date(2026, 2, 12));
              const byStatus = {};
              Object.keys(ST).forEach(k => { byStatus[k] = memberPosts.filter(p => p.status === k).length; });
              const totalPending = byStatus.review + byStatus.changes;
              const totalWork = memberPosts.length + memberDemands.length;
              const workLevel = totalWork === 0 ? "livre" : totalWork <= 3 ? "normal" : totalWork <= 6 ? "ocupado" : "sobrecarregado";
              const workColor = { livre:C.ac, normal:"#3B82F6", ocupado:"#F59E0B", sobrecarregado:C.rd }[workLevel];
              return (
                <div key={t.id} className="fu" style={{ background:C.white, borderRadius:14, border:`1px solid ${C.bd}`, padding:16, marginBottom:8, animationDelay:`${i * 30}ms` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                    <Av name={t.name} color={t.color} size={44} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:15 }}>{t.name}</div>
                      <div style={{ fontSize:11, color:C.t3 }}>{t.role}</div>
                    </div>
                    {/* Workload badge */}
                    <div style={{ textAlign:"right" }}>
                      <span style={{ padding:"3px 10px", borderRadius:20, background:workColor + "15", color:workColor, fontSize:10, fontWeight:700, border:`1px solid ${workColor}30`, textTransform:"capitalize" }}>
                        {workLevel}
                      </span>
                      {overdueDemands.length > 0 && (
                        <div style={{ fontSize:9, color:C.rd, fontWeight:700, marginTop:3 }}>🔴 {overdueDemands.length} atrasada{overdueDemands.length !== 1 ? "s" : ""}</div>
                      )}
                    </div>
                  </div>

                  {/* Workload summary */}
                  <div style={{ display:"flex", gap:6, marginBottom:10 }}>
                    <div style={{ flex:1, textAlign:"center", padding:"6px 0", borderRadius:8, background:C.s1, border:`1px solid ${C.bd}` }}>
                      <div style={{ fontSize:16, fontWeight:800, color:C.tx }}>{memberPosts.length}</div>
                      <div style={{ fontSize:8, fontWeight:600, color:C.t3 }}>Posts</div>
                    </div>
                    <div style={{ flex:1, textAlign:"center", padding:"6px 0", borderRadius:8, background:C.s1, border:`1px solid ${C.bd}` }}>
                      <div style={{ fontSize:16, fontWeight:800, color:C.tx }}>{memberDemands.length}</div>
                      <div style={{ fontSize:8, fontWeight:600, color:C.t3 }}>Demandas</div>
                    </div>
                    <div style={{ flex:1, textAlign:"center", padding:"6px 0", borderRadius:8, background: totalPending > 0 ? ST.review.bg : C.s1, border:`1px solid ${totalPending > 0 ? ST.review.border : C.bd}` }}>
                      <div style={{ fontSize:16, fontWeight:800, color: totalPending > 0 ? ST.review.c : C.tx }}>{totalPending}</div>
                      <div style={{ fontSize:8, fontWeight:600, color: totalPending > 0 ? ST.review.c : C.t3 }}>Pendentes</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  {memberPosts.length > 0 && (
                    <div style={{ display:"flex", height:6, borderRadius:3, overflow:"hidden", background:C.s1 }}>
                      {Object.entries(ST).map(([k, s]) => {
                        const pct = (byStatus[k] / memberPosts.length) * 100;
                        return pct > 0 ? <div key={k} style={{ width:`${pct}%`, background:s.c }} /> : null;
                      })}
                    </div>
                  )}
                  {/* Assigned posts list */}
                  {memberPosts.length > 0 && (
                    <div style={{ marginTop:10 }}>
                      {memberPosts.slice(0, 4).map(p => {
                        const cl = clients.find(c => c.id === p.clientId);
                        return (
                          <div key={p.id} onClick={() => setSelP(p)} style={{
                            display:"flex", alignItems:"center", gap:8, padding:"6px 0",
                            borderBottom:`1px solid ${C.s1}`, cursor:"pointer", fontSize:12,
                          }}>
                            <div style={{ width:6, height:6, borderRadius:"50%", background:ST[p.status].c, flexShrink:0 }} />
                            <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", color:C.t2 }}>
                              {p.title}
                            </span>
                            <span style={{ fontSize:10, color:C.t3 }}>{cl?.name}</span>
                          </div>
                        );
                      })}
                      {memberPosts.length > 4 && (
                        <div style={{ fontSize:10, color:C.t3, marginTop:4 }}>+{memberPosts.length - 4} mais</div>
                      )}
                    </div>
                  )}
                  {memberPosts.length === 0 && (
                    <div style={{ fontSize:11, color:C.t3, textAlign:"center", padding:8 }}>Nenhum post atribuído</div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ CLIENTS (Pode Postar style cards) ═══ */}
        {view === "clients" && (
          <div style={{ padding: mob ? 14 : 20 }}>
            {/* Header */}
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:6 }}>
              <div>
                <h1 className="fu" style={{ fontSize: mob ? 22 : 28, fontWeight:800, marginBottom:4 }}>Todos os clientes</h1>
                <p className="fu" style={{ fontSize:13, color:C.t3 }}>Gerencie todos os clientes e seus conteúdos</p>
              </div>
              <button onClick={() => { setPicker(true); setAddCl(true); }} className="tap" style={{ padding:"8px 16px", borderRadius:10, background:C.ac, border:"none", color:"#fff", fontWeight:700, fontSize:12, whiteSpace:"nowrap", cursor:"pointer", flexShrink:0 }}>+ Novo Cliente</button>
            </div>

            {/* Search */}
            <div className="fu" style={{ display:"flex", gap:8, marginBottom:18, animationDelay:"60ms" }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Buscar por nome, @handle, segmento ou email..." style={{ ...inp, flex:1, fontSize:13, padding:"10px 14px" }} />
            </div>

            {/* Client cards grid */}
            <div style={{ display:"grid", gridTemplateColumns: mob ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap:14 }}>
              {clients.filter(c => {
                if (!search) return true;
                const q = search.toLowerCase();
                return c.name.toLowerCase().includes(q) || (c.instagram || "").toLowerCase().includes(q) || (c.segment || "").toLowerCase().includes(q) || (c.email || "").toLowerCase().includes(q);
              }).map((c, i) => {
                const cp = posts.filter(p => p.clientId === c.id);
                const byStatus = {};
                Object.keys(ST).forEach(k => { byStatus[k] = cp.filter(p => p.status === k).length; });
                /* Generate gradient from client color */
                const hex = c.color || "#3498DB";
                const grad1 = hex + "40";
                const grad2 = hex + "15";
                const grad3 = hex + "08";
                return (
                  <div key={c.id} className="fu lift" style={{
                    background:C.white, borderRadius:16, border:`1px solid ${C.bd}`,
                    overflow:"hidden", cursor:"pointer", animationDelay:`${i * 40}ms`,
                  }} onClick={() => { setSelC(c.id); setView("cal"); }}>
                    {/* Gradient header */}
                    <div style={{
                      height:56, position:"relative",
                      background:`linear-gradient(135deg, ${grad1}, ${grad2}, ${grad3}, #FFF8)`,
                    }}>
                      {/* Avatar overlapping */}
                      <div style={{ position:"absolute", bottom:-20, left:16 }}>
                        <Av name={c.name} color={c.color} size={44} />
                      </div>
                      {/* Active badge */}
                      <div style={{ position:"absolute", top:10, right:10 }}>
                        <span style={{ padding:"3px 10px", borderRadius:12, background:C.acBg, color:C.ac, fontSize:10, fontWeight:700, border:`1px solid #86EFAC` }}>Ativo</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding:"26px 16px 16px" }}>
                      {/* Name */}
                      <div style={{ fontWeight:700, fontSize:15, marginBottom:2 }}>{c.name}</div>
                      {/* Handle + segment */}
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                        {c.instagram && <span style={{ fontSize:11, color:C.t3 }}>{c.instagram}</span>}
                      </div>
                      {c.segment && (
                        <div style={{ fontSize:11, color:C.t2, fontWeight:500, marginBottom:10 }}>{c.segment}</div>
                      )}

                      {/* Status counters - dot style like reference */}
                      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <div style={{ width:7, height:7, borderRadius:"50%", background:ST.draft.c }} />
                          <span style={{ fontSize:11, color:C.t2 }}><strong style={{ color:ST.draft.c }}>{byStatus.draft}</strong> Rascunho</span>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <div style={{ width:7, height:7, borderRadius:"50%", background:ST.changes.c }} />
                          <span style={{ fontSize:11, color:C.t2 }}><strong style={{ color:ST.changes.c }}>{byStatus.changes}</strong> Ajuste</span>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <div style={{ width:7, height:7, borderRadius:"50%", background:ST.review.c }} />
                          <span style={{ fontSize:11, color:C.t2 }}><strong style={{ color:ST.review.c }}>{byStatus.review}</strong> Aprovação</span>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <div style={{ width:7, height:7, borderRadius:"50%", background:ST.approved.c }} />
                          <span style={{ fontSize:11, color:C.t2 }}><strong style={{ color:ST.approved.c }}>{byStatus.approved}</strong> Aprovados</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty state */}
            {clients.length === 0 && (
              <div className="fu" style={{ textAlign:"center", padding:40, color:C.t3 }}>
                <div style={{ fontSize:40, marginBottom:12 }}>👥</div>
                <p style={{ fontWeight:700 }}>Nenhum cliente cadastrado</p>
                <p style={{ fontSize:12, marginTop:4 }}>Toque em + Novo Cliente para começar</p>
              </div>
            )}
          </div>
        )}

        {/* ═══ DEMANDAS ═══ */}
        {view === "dem" && (() => {
          const filterDem = selC ? demands.filter(d => d.clientId === selC) : demands;
          const statusOrder = ["new","production","review","done"];
          const advanceDem = (id) => {
            const d = demands.find(x => x.id === id);
            if (!d) return;
            const idx = statusOrder.indexOf(d.status);
            if (idx < statusOrder.length - 1) upDemSt(id, statusOrder[idx + 1]);
          };
          return (
          <div style={{ padding: mob ? 14 : 20 }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:8 }}>
              <div>
                <h1 className="fu" style={{ fontSize: mob ? 22 : 28, fontWeight:800, marginBottom:4 }}>Demandas</h1>
                <p style={{ fontSize:13, color:C.t3 }}>{filterDem.length} demanda{filterDem.length !== 1 ? "s" : ""}</p>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                <button onClick={() => setDemView(demView === "kanban" ? "list" : "kanban")} className="tap" style={{ padding:"7px 12px", borderRadius:8, background:C.s1, border:`1px solid ${C.bd}`, color:C.t3, fontSize:12, fontWeight:600, cursor:"pointer" }}>
                  {demView === "kanban" ? "☰ Lista" : "▥ Kanban"}
                </button>
                <button onClick={() => setShowNewDem(true)} className="tap" style={{ padding:"7px 14px", borderRadius:8, background:C.ac, border:"none", color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer" }}>+ Nova</button>
              </div>
            </div>

            {/* KANBAN */}
            {demView === "kanban" && (
              <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:8 }}>
                {Object.entries(DS).map(([sk, sv2]) => {
                  const col = filterDem.filter(d => d.status === sk);
                  const nextKey = statusOrder[statusOrder.indexOf(sk) + 1];
                  return (
                    <div key={sk} style={{ minWidth: mob ? 250 : 270, flex: mob ? "none" : 1, background:C.s1, borderRadius:14, border:`1px solid ${C.bd}`, overflow:"hidden", display:"flex", flexDirection:"column" }}>
                      {/* Column header */}
                      <div style={{ padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", background:sv2.bg, borderBottom:`1px solid ${sv2.border}` }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <div style={{ width:8, height:8, borderRadius:"50%", background:sv2.c }} />
                          <span style={{ fontSize:12, fontWeight:700, color:sv2.c }}>{sv2.l}</span>
                        </div>
                        <span style={{ fontSize:11, fontWeight:700, color:sv2.c, background:C.white, padding:"1px 8px", borderRadius:10 }}>{col.length}</span>
                      </div>
                      {/* Cards */}
                      <div style={{ padding:8, display:"flex", flexDirection:"column", gap:6, flex:1, minHeight:80 }}>
                        {col.map(d => {
                          const cl = clients.find(c => c.id === d.clientId);
                          const a = team.find(t => t.id === d.assignee);
                          const dt = DT[d.type];
                          const pr = PRIO[d.priority];
                          return (
                            <div key={d.id} className="fu lift" style={{ background:C.white, borderRadius:10, padding:12, border:`1px solid ${C.bd}` }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                                <span style={{ fontSize:10, fontWeight:600, color:C.t3 }}>{dt?.ic} {dt?.l}</span>
                                <span style={{ fontSize:9, fontWeight:700, color:pr?.c, background:pr?.bg, padding:"1px 8px", borderRadius:8 }}>{pr?.l}</span>
                              </div>
                              <div style={{ fontSize:13, fontWeight:700, marginBottom:3, lineHeight:1.3 }}>{d.title}</div>
                              {d.description && <div style={{ fontSize:11, color:C.t3, marginBottom:6, lineHeight:1.3, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{d.description}</div>}
                              {d.deadline && (() => {
                                const dl = new Date(d.deadline + "T23:59:59");
                                const now = new Date(2026, 2, 12);
                                const diff = Math.ceil((dl - now) / (1000 * 60 * 60 * 24));
                                const overdue = diff < 0;
                                const urgent = diff >= 0 && diff <= 2;
                                return (
                                  <div style={{ fontSize:9, fontWeight:700, marginBottom:6, display:"flex", alignItems:"center", gap:4, color: overdue ? C.rd : urgent ? "#D97706" : C.t3 }}>
                                    {overdue ? "🔴" : urgent ? "🟡" : "📅"} {overdue ? `Atrasado ${Math.abs(diff)}d` : diff === 0 ? "Vence hoje!" : `${diff}d restantes`} · {new Date(d.deadline).toLocaleDateString("pt-BR")}
                                  </div>
                                );
                              })()}
                              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                                  {cl && <span style={{ fontSize:10, color:C.t3 }}>{cl.name}</span>}
                                  {d.files?.length > 0 && <span style={{ fontSize:9, color:C.t3 }}>📎{d.files.length}</span>}
                                </div>
                                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                                  {a && <div title={a.name + " — " + a.role} style={{ width:22, height:22, borderRadius:6, background:a.color + "18", color:a.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800 }}>{a.name[0]}</div>}
                                </div>
                              </div>
                              {/* Single advance button */}
                              {nextKey && (
                                <button onClick={e => { e.stopPropagation(); advanceDem(d.id); }} className="tap" style={{
                                  width:"100%", marginTop:8, padding:"5px 0", borderRadius:6,
                                  background:DS[nextKey].bg, border:`1px solid ${DS[nextKey].border}`,
                                  color:DS[nextKey].c, fontSize:10, fontWeight:700, cursor:"pointer",
                                }}>Avançar → {DS[nextKey].l}</button>
                              )}
                            </div>
                          );
                        })}
                        {col.length === 0 && <div style={{ textAlign:"center", padding:16, fontSize:11, color:C.t3 }}>Vazio</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* LIST */}
            {demView === "list" && (
              <div>
                {filterDem.length === 0 && <div className="fu" style={{ textAlign:"center", padding:40, color:C.t3 }}><div style={{ fontSize:36, marginBottom:8 }}>📋</div><p style={{ fontWeight:600 }}>Nenhuma demanda</p></div>}
                {filterDem.map((d, i) => {
                  const cl = clients.find(c => c.id === d.clientId);
                  const a = team.find(t => t.id === d.assignee);
                  const dt = DT[d.type];
                  const pr = PRIO[d.priority];
                  const ds2 = DS[d.status];
                  return (
                    <div key={d.id} className="fu" style={{ background:C.white, borderRadius:12, border:`1px solid ${C.bd}`, padding:14, marginBottom:6, animationDelay:`${i * 25}ms` }}>
                      <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                        <div style={{ width:40, height:40, borderRadius:10, background:ds2.bg, border:`1px solid ${ds2.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{dt?.ic}</div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3, flexWrap:"wrap" }}>
                            <span style={{ fontSize:13, fontWeight:700 }}>{d.title}</span>
                            {pr && <span style={{ fontSize:9, fontWeight:700, color:pr.c, background:pr.bg, padding:"1px 8px", borderRadius:8 }}>{pr.l}</span>}
                          </div>
                          {d.description && <div style={{ fontSize:11, color:C.t3, marginBottom:6, lineHeight:1.3 }}>{d.description}</div>}
                          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                            <span style={{ fontSize:10, padding:"2px 8px", borderRadius:6, background:ds2.bg, color:ds2.c, fontWeight:700, border:`1px solid ${ds2.border}` }}>{ds2.l}</span>
                            {cl && <span style={{ fontSize:10, color:C.t3 }}>{cl.name}</span>}
                            {a && <span style={{ fontSize:10, color:a.color, fontWeight:600 }}>👤 {a.name}</span>}
                          </div>
                        </div>
                        <select value={d.status} onChange={e => upDemSt(d.id, e.target.value)} style={{ padding:"4px 8px", borderRadius:6, border:`1px solid ${C.bd}`, background:C.white, fontSize:10, color:C.t2, cursor:"pointer" }}>
                          {Object.entries(DS).map(([k, s]) => <option key={k} value={k}>{s.l}</option>)}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          );
        })()}
      </main>

      {/* BOTTOM NAV */}
      <nav style={{ display:"flex", borderTop:`1px solid ${C.bd}`, background:C.white, padding:"4px 0 8px", flexShrink:0 }}>
        {[{id:"cal",ic:"📅",l:"Calendário"},{id:"dem",ic:"📋",l:"Demandas"},{id:"team",ic:"👥",l:"Equipe"},{id:"clients",ic:"🏢",l:"Clientes"},{id:"brand",ic:"🎯",l:"Brand"}].map(t => (
          <button key={t.id} onClick={() => { setView(t.id); setSelP(null); }} className="tap" style={{
            flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2,
            padding:"8px 4px", background:"none", border:"none", color: view === t.id ? C.ac : C.t3, cursor:"pointer",
          }}>
            <span style={{ fontSize:18 }}>{t.ic}</span>
            <span style={{ fontSize:9, fontWeight: view === t.id ? 800 : 500 }}>{t.l}</span>
            {view === t.id && <div style={{ width:16, height:3, borderRadius:2, background:C.ac }} />}
          </button>
        ))}
      </nav>

      {/* ═══ POST DETAIL ═══ */}
      {selP && (
        <div className="sR" style={{ position:"fixed", inset:0, background:C.bg, zIndex:150, overflowY:"auto", display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.bd}`, display:"flex", alignItems:"center", gap:10, background:C.white, position:"sticky", top:0, zIndex:10 }}>
            <button onClick={() => setSelP(null)} className="tap" style={{ width:34, height:34, borderRadius:10, background:C.s1, border:`1px solid ${C.bd}`, color:C.t2, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>←</button>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:15, fontWeight:800, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{selP.title}</div>
              <div style={{ fontSize:11, color:C.t3 }}>{clients.find(c => c.id === selP.clientId)?.name} · {selP.date}</div>
            </div>
            <Tag status={selP.status} />
          </div>
          <div style={{ flex:1, padding:14 }}>
            {/* Caption */}
            <div className="fu" style={{ background:C.white, borderRadius:12, padding:16, marginBottom:14, border:`1px solid ${C.bd}` }}>
              <Lbl>Legenda</Lbl>
              <p style={{ fontSize:14, lineHeight:1.7, color:C.t2 }}>{selP.caption}</p>
            </div>
            {/* Media */}
            <div className="fu" style={{ marginBottom:14 }}>
              {selP.media?.length > 0 && <div style={{ marginBottom:10 }}><MediaView media={selP.media} color={selP.coverColor} /></div>}
              <MediaUp media={selP.media || []} onChange={up => { const nm = typeof up === "function" ? up(selP.media || []) : up; setSelP({ ...selP, media: nm }); sv({ ...data, posts: data.posts.map(p => p.id === selP.id ? { ...p, media: nm } : p) }); }} />
            </div>
            {/* Assignee */}
            <div className="fu" style={{ marginBottom:14 }}>
              <Lbl>👤 Responsável</Lbl>
              <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                {team.map(t => (
                  <button key={t.id} onClick={() => { setSelP({ ...selP, assignee: t.id }); sv({ ...data, posts: data.posts.map(p => p.id === selP.id ? { ...p, assignee: t.id } : p) }); }} className="tap" style={{
                    display:"flex", alignItems:"center", gap:4, padding:"6px 10px", borderRadius:8,
                    border: selP.assignee === t.id ? `2px solid ${t.color}` : `1px solid ${C.bd}`,
                    background: selP.assignee === t.id ? t.color + "12" : C.white,
                    color: selP.assignee === t.id ? t.color : C.t3, fontSize:11, fontWeight:600, cursor:"pointer",
                  }}>
                    <div style={{ width:18, height:18, borderRadius:5, background:t.color + "20", color:t.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800 }}>{t.name[0]}</div>
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
            {/* Status */}
            <div className="fu" style={{ marginBottom:14 }}>
              <Lbl>Status</Lbl>
              <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                {Object.entries(ST).map(([k, s]) => (
                  <button key={k} onClick={() => { upSt(selP.id, k); setSelP({ ...selP, status: k }); }} className="tap" style={{
                    padding:"8px 12px", borderRadius:8, fontSize:11, fontWeight:700,
                    border: selP.status === k ? `2px solid ${s.c}` : `1px solid ${C.bd}`,
                    background: selP.status === k ? s.bg : C.white,
                    color: selP.status === k ? s.c : C.t3, cursor:"pointer",
                  }}>{s.l}</button>
                ))}
              </div>
            </div>
            {/* Chat */}
            <div className="fu" style={{ marginBottom:14 }}>
              <Lbl>Chat</Lbl>
              <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.bd}`, overflow:"hidden" }}>
                {selP.feedback.length === 0 && <div style={{ padding:18, textAlign:"center", fontSize:12, color:C.t3 }}>Nenhuma mensagem</div>}
                {selP.feedback.map((f, i) => (
                  <div key={i} style={{ padding:"10px 14px", borderBottom: i < selP.feedback.length - 1 ? `1px solid ${C.bd}` : "none", display:"flex", gap:8 }}>
                    <div style={{ width:26, height:26, borderRadius:8, flexShrink:0, background: f.from === "cliente" ? "#DBEAFE" : C.acBg, color: f.from === "cliente" ? "#2563EB" : C.ac, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800 }}>{f.from === "cliente" ? "C" : "E"}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:10, color:C.t3 }}>{f.from === "cliente" ? "Cliente" : "Equipe"} · {new Date(f.at).toLocaleDateString("pt-BR")}</div>
                      <div style={{ fontSize:13, color:C.tx, marginTop:2 }}>{f.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:6, marginTop:8 }}>
                <input value={fb} onChange={e => setFb(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && fb.trim()) { addFb(selP.id, fb); setSelP({ ...selP, feedback: [...selP.feedback, { from:"equipe", text:fb, at:new Date().toISOString() }] }); setFb(""); } }} placeholder="Mensagem..." style={{ ...inp, flex:1 }} />
                <button onClick={() => { if (fb.trim()) { addFb(selP.id, fb); setSelP({ ...selP, feedback: [...selP.feedback, { from:"equipe", text:fb, at:new Date().toISOString() }] }); setFb(""); } }} className="tap" style={{ width:42, borderRadius:10, background:C.ac, border:"none", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer" }}>↑</button>
              </div>
            </div>
            <button onClick={() => delP(selP.id)} className="tap" style={{ width:"100%", padding:10, borderRadius:10, border:`1px solid #FECACA`, background:C.rdBg, color:C.rd, fontSize:12, fontWeight:700, cursor:"pointer" }}>Excluir Post</button>
            <div style={{ height:24 }} />
          </div>
        </div>
      )}

      {/* MODALS */}
      {showNew && <Sheet onClose={() => setShowNew(false)} title="Novo Conteúdo"><NewPost clients={clients} team={team} sel={selC} onSubmit={addP} onCancel={() => setShowNew(false)} /></Sheet>}

      {showNewDem && (
        <Sheet onClose={() => setShowNewDem(false)} title="Nova Demanda">
          <NewDemand clients={clients} team={team} sel={selC} onSubmit={addDem} onCancel={() => setShowNewDem(false)} />
        </Sheet>
      )}

      {notifs && (
        <Sheet onClose={() => setNotifs(false)} title="🔔 Notificações">
          {unread > 0 && <button onClick={markAll} className="tap" style={{ width:"100%", padding:10, borderRadius:10, background:C.s1, border:`1px solid ${C.bd}`, color:C.t2, fontWeight:600, fontSize:12, marginBottom:12, cursor:"pointer" }}>Marcar todas como lidas</button>}
          {nots.length === 0 && <div style={{ textAlign:"center", padding:24, color:C.t3 }}>🔕 Nenhuma notificação</div>}
          {[...nots].reverse().map((n, i) => {
            const a = team.find(t => t.id === n.assigneeId);
            return (
              <div key={n.id} className="fu" style={{ background: n.read ? C.white : C.rdBg, borderRadius:12, padding:14, border:`1px solid ${n.read ? C.bd : "#FECACA"}`, marginBottom:6, animationDelay:`${i * 25}ms` }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                    {!n.read && <div style={{ width:6, height:6, borderRadius:"50%", background:C.rd }} />}
                    <span style={{ fontSize:12, fontWeight:700 }}>🔄 Ajuste</span>
                  </div>
                  <span style={{ fontSize:10, color:C.t3 }}>{new Date(n.at).toLocaleDateString("pt-BR")}</span>
                </div>
                <div style={{ fontSize:11, color:C.t2, marginBottom:4 }}><strong>{n.clientName}</strong> → {n.postTitle}</div>
                <div style={{ fontSize:12, background:C.s1, borderRadius:8, padding:"8px 12px", marginBottom:8, border:`1px solid ${C.bd}` }}>{"\""}{n.message}{"\""}</div>
                {a && <div style={{ fontSize:10, color:C.t3, marginBottom:8 }}>👤 {a.name}</div>}
                <div style={{ display:"flex", gap:4 }}>
                  {waLink(n) && <a href={waLink(n)} target="_blank" rel="noopener noreferrer" className="tap" style={{ flex:1, padding:7, borderRadius:8, background:"#DCFCE7", border:`1px solid #86EFAC`, color:"#16A34A", fontWeight:700, fontSize:11, textDecoration:"none", textAlign:"center" }}>📱 WhatsApp</a>}
                  {emLink(n) && <a href={emLink(n)} target="_blank" rel="noopener noreferrer" className="tap" style={{ flex:1, padding:7, borderRadius:8, background:C.orBg, border:`1px solid #FDBA74`, color:C.or, fontWeight:700, fontSize:11, textDecoration:"none", textAlign:"center" }}>📧 Email</a>}
                  {!n.read && <button onClick={() => markR(n.id)} className="tap" style={{ padding:"7px 10px", borderRadius:8, background:C.s1, border:`1px solid ${C.bd}`, color:C.t3, fontWeight:600, fontSize:11, cursor:"pointer" }}>✓</button>}
                </div>
              </div>
            );
          })}
        </Sheet>
      )}

      {picker && (
        <Sheet onClose={() => setPicker(false)} title="Selecionar Cliente">
          <div onClick={() => { setSelC(null); setPicker(false); }} className="tap" style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:12, cursor:"pointer", marginBottom:4, background: !selC ? C.acBg : C.white, border:`1.5px solid ${!selC ? C.ac + "40" : C.bd}` }}>
            <span style={{ fontSize:16 }}>🌐</span>
            <span style={{ fontSize:14, fontWeight:700 }}>Todos</span>
          </div>
          {clients.map(c => (
            <div key={c.id} onClick={() => { setSelC(c.id); setPicker(false); }} className="tap" style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:12, cursor:"pointer", marginBottom:4, background: selC === c.id ? C.acBg : C.white, border:`1.5px solid ${selC === c.id ? C.ac + "40" : C.bd}` }}>
              <Av name={c.name} color={c.color} size={32} />
              <span style={{ fontSize:14, fontWeight:700 }}>{c.name}</span>
            </div>
          ))}
          <div style={{ marginTop:10 }}>
            {!addCl ? (
              <button onClick={() => setAddCl(true)} className="tap" style={{ width:"100%", padding:12, borderRadius:12, background:C.s1, border:`1.5px dashed ${C.bd2}`, color:C.t3, fontSize:12, fontWeight:600, cursor:"pointer" }}>+ Novo Cliente</button>
            ) : (
              <div style={{ background:C.s1, borderRadius:12, padding:14, border:`1px solid ${C.bd}` }}>
                <div style={{ marginBottom:10 }}><Lbl>Nome *</Lbl><input value={nc.name} onChange={e => setNc({ ...nc, name: e.target.value })} placeholder="Ex: Restaurante da Maria" style={inp} /></div>
                <div style={{ marginBottom:10 }}><Lbl>@ Instagram</Lbl><input value={nc.instagram} onChange={e => setNc({ ...nc, instagram: e.target.value })} placeholder="@nomedoperfil" style={inp} /></div>
                <div style={{ display:"flex", gap:6, marginBottom:10 }}>
                  <div style={{ flex:1 }}><Lbl>Telefone / WhatsApp</Lbl><input value={nc.phone} onChange={e => setNc({ ...nc, phone: e.target.value })} placeholder="5541999999999" style={inp} /></div>
                  <div style={{ flex:1 }}><Lbl>Email</Lbl><input value={nc.email} onChange={e => setNc({ ...nc, email: e.target.value })} placeholder="email@cliente.com" style={inp} /></div>
                </div>
                <div style={{ display:"flex", gap:6, marginBottom:10 }}>
                  <div style={{ flex:1 }}><Lbl>Segmento</Lbl><input value={nc.segment} onChange={e => setNc({ ...nc, segment: e.target.value })} placeholder="Ex: Restaurante" style={inp} /></div>
                  <div style={{ flex:1 }}><Lbl>Contrato (R$)</Lbl><input value={nc.contract} onChange={e => setNc({ ...nc, contract: e.target.value })} placeholder="3500" style={inp} /></div>
                </div>
                <div style={{ marginBottom:10 }}><Lbl>Data de Início</Lbl><input type="date" value={nc.startDate} onChange={e => setNc({ ...nc, startDate: e.target.value })} style={inp} /></div>
                <div style={{ marginBottom:10 }}>
                  <Lbl>Cor</Lbl>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {["#FF6B35","#2ECC71","#3498DB","#F1C40F","#9B59B6","#E74C3C","#1ABC9C","#E67E22"].map(c => (
                      <div key={c} onClick={() => setNc({ ...nc, color: c })} className="tap" style={{ width:30, height:30, borderRadius:8, background:c, border: nc.color === c ? "3px solid #1A1A2E" : "3px solid transparent", cursor:"pointer" }} />
                    ))}
                  </div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button onClick={addCli} className="tap" style={{ flex:1, padding:10, borderRadius:10, background:C.ac, color:"#fff", border:"none", fontWeight:700, cursor:"pointer" }}>Adicionar Cliente</button>
                  <button onClick={() => setAddCl(false)} className="tap" style={{ padding:"10px 14px", borderRadius:10, background:C.white, border:`1px solid ${C.bd}`, color:C.t2, fontWeight:600, cursor:"pointer" }}>Cancelar</button>
                </div>
              </div>
            )}
          </div>
        </Sheet>
      )}
    </div>
  );
}

/* ═══ CLIENT PORTAL ═══ */
function PortalView({ cid, data, onSave, onBack }) {
  const mob = useMob();
  const [sel, setSel] = useState(null);
  const [cmt, setCmt] = useState("");
  const [adjForm, setAdjForm] = useState(false);
  const [adjErr, setAdjErr] = useState(false);

  const cl = data.clients.find(c => c.id === cid);
  if (!cl) return <div className="bgs7" style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh" }}><div style={{ textAlign:"center" }}><div style={{ fontSize:48 }}>🔒</div><div style={{ fontSize:16, fontWeight:700, marginTop:12 }}>Link inválido</div></div></div>;

  const cp = data.posts.filter(p => p.clientId === cid && p.status !== "draft");
  const pend = cp.filter(p => p.status === "review").length;

  const approve = id => { onSave({ ...data, posts: data.posts.map(p => p.id === id ? { ...p, status:"approved" } : p) }); if (sel?.id === id) setSel({ ...sel, status:"approved" }); };
  const reqChange = id => {
    if (!cmt.trim()) { setAdjErr(true); return; }
    setAdjErr(false);
    const fb = { from:"cliente", text:cmt.trim(), at:new Date().toISOString() };
    const post = data.posts.find(p => p.id === id);
    const a = data.team.find(t => t.id === post?.assignee);
    const n = { id:"n" + Date.now(), postId:id, clientId:cid, type:"change_request", message:cmt.trim(), at:new Date().toISOString(), assigneeId:post?.assignee, read:false, postTitle:post?.title, clientName:cl.name, assigneeName:a?.name };
    onSave({ ...data, posts: data.posts.map(p => p.id === id ? { ...p, status:"changes", feedback:[...p.feedback, fb] } : p), notifications:[...(data.notifications || []), n] });
    if (sel?.id === id) setSel({ ...sel, status:"changes", feedback:[...sel.feedback, fb] });
    setCmt(""); setAdjForm(false);
  };
  const addCmt = id => { if (!cmt.trim()) return; const fb = { from:"cliente", text:cmt.trim(), at:new Date().toISOString() }; onSave({ ...data, posts:data.posts.map(p => p.id === id ? { ...p, feedback:[...p.feedback, fb] } : p) }); if (sel?.id === id) setSel({ ...sel, feedback:[...sel.feedback, fb] }); setCmt(""); };

  if (sel) {
    const p = sel;
    return (
      <div className="bgs7 sR" style={{ position:"fixed", inset:0, background:C.bg, zIndex:150, overflowY:"auto" }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.bd}`, display:"flex", alignItems:"center", gap:10, background:C.white, position:"sticky", top:0, zIndex:10 }}>
          <button onClick={() => { setSel(null); setAdjForm(false); setCmt(""); }} className="tap" style={{ width:34, height:34, borderRadius:10, background:C.s1, border:`1px solid ${C.bd}`, color:C.t2, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>←</button>
          <div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:15, fontWeight:800 }}>{p.title}</div><div style={{ fontSize:11, color:C.t3 }}>{p.date}</div></div>
          <Tag status={p.status} />
        </div>
        <div style={{ padding:16 }}>
          <div className="fu" style={{ marginBottom:16 }}><MediaView media={p.media} color={p.coverColor || cl.color} /></div>
          <div className="fu" style={{ background:C.white, borderRadius:12, padding:16, marginBottom:16, border:`1px solid ${C.bd}` }}><Lbl>Legenda</Lbl><p style={{ fontSize:14, lineHeight:1.7, color:C.t2 }}>{p.caption}</p></div>

          {p.status === "review" && !adjForm && (
            <div className="fu" style={{ marginBottom:16 }}>
              <Lbl>O que acha?</Lbl>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => approve(p.id)} className="tap" style={{ flex:1, padding:14, borderRadius:12, border:`2px solid ${C.ac}40`, background:C.acBg, color:C.ac, fontWeight:800, fontSize:15, cursor:"pointer" }}>✅ Pode Postar!</button>
                <button onClick={() => { setAdjForm(true); setAdjErr(false); }} className="tap" style={{ flex:1, padding:14, borderRadius:12, border:`2px solid ${C.or}40`, background:C.orBg, color:C.or, fontWeight:800, fontSize:15, cursor:"pointer" }}>📝 Ajuste</button>
              </div>
            </div>
          )}
          {p.status === "review" && adjForm && (
            <div className="fu" style={{ marginBottom:16, background:C.orBg, borderRadius:14, padding:16, border:`1.5px solid #FDBA74` }}>
              <div style={{ fontSize:14, fontWeight:700, color:C.or, marginBottom:4 }}>📝 Descreva o ajuste</div>
              <textarea value={cmt} onChange={e => { setCmt(e.target.value); setAdjErr(false); }} placeholder="O que precisa mudar?" rows={3} style={{ ...inp, borderColor: adjErr ? C.rd : C.bd, resize:"vertical", lineHeight:1.5, marginBottom:6 }} />
              {adjErr && <div style={{ fontSize:11, color:C.rd, fontWeight:600, marginBottom:6 }}>⚠️ Descreva o ajuste</div>}
              <div style={{ display:"flex", gap:6 }}>
                <button onClick={() => reqChange(p.id)} className="tap" style={{ flex:1, padding:10, borderRadius:10, background:C.or, color:"#fff", border:"none", fontWeight:700, cursor:"pointer" }}>Enviar</button>
                <button onClick={() => { setAdjForm(false); setCmt(""); }} className="tap" style={{ padding:"10px 14px", borderRadius:10, background:C.white, border:`1px solid ${C.bd}`, color:C.t2, fontWeight:600, cursor:"pointer" }}>Cancelar</button>
              </div>
            </div>
          )}
          {p.status === "approved" && <div className="fu" style={{ background:C.acBg, borderRadius:14, padding:18, border:`1px solid #86EFAC`, textAlign:"center", marginBottom:16 }}><div style={{ fontSize:28 }}>✅</div><div style={{ fontSize:15, fontWeight:800, color:C.ac, marginTop:4 }}>Aprovado!</div></div>}
          {p.status === "changes" && <div className="fu" style={{ background:C.orBg, borderRadius:14, padding:18, border:`1px solid #FDBA74`, textAlign:"center", marginBottom:16 }}><div style={{ fontSize:28 }}>🔄</div><div style={{ fontSize:15, fontWeight:800, color:C.or, marginTop:4 }}>Ajuste Solicitado</div></div>}

          <div className="fu" style={{ marginBottom:16 }}>
            <Lbl>Mensagens</Lbl>
            <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.bd}`, overflow:"hidden" }}>
              {p.feedback.length === 0 && <div style={{ padding:16, textAlign:"center", fontSize:12, color:C.t3 }}>Nenhuma mensagem</div>}
              {p.feedback.map((f, i) => (
                <div key={i} style={{ padding:"10px 14px", borderBottom: i < p.feedback.length - 1 ? `1px solid ${C.bd}` : "none", display:"flex", gap:8 }}>
                  <div style={{ width:26, height:26, borderRadius:8, flexShrink:0, background: f.from === "cliente" ? "#DBEAFE" : C.acBg, color: f.from === "cliente" ? "#2563EB" : C.ac, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800 }}>{f.from === "cliente" ? "Eu" : "BGS"}</div>
                  <div style={{ flex:1 }}><div style={{ fontSize:10, color:C.t3 }}>{f.from === "cliente" ? "Você" : "Equipe"} · {new Date(f.at).toLocaleDateString("pt-BR")}</div><div style={{ fontSize:12, marginTop:2, color:C.tx }}>{f.text}</div></div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:6, marginTop:8 }}>
              <input value={cmt} onChange={e => setCmt(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addCmt(p.id); }} placeholder="Comentário..." style={{ ...inp, flex:1 }} />
              <button onClick={() => addCmt(p.id)} className="tap" style={{ width:40, borderRadius:10, background:C.ac, border:"none", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer" }}>↑</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bgs7" style={{ minHeight:"100vh" }}>
      <div style={{ padding:"14px 16px", borderBottom:`1px solid ${C.bd}`, display:"flex", alignItems:"center", gap:10, background:C.white, position:"sticky", top:0, zIndex:10 }}>
        <button onClick={onBack} className="tap" style={{ width:30, height:30, borderRadius:8, background:C.s1, border:`1px solid ${C.bd}`, color:C.t2, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>←</button>
        <Av name={cl.name} color={cl.color} size={34} />
        <div style={{ flex:1 }}><div style={{ fontSize:15, fontWeight:800 }}>{cl.name}</div><div style={{ fontSize:10, color:C.t3 }}>Aprovação</div></div>
      </div>
      <div style={{ padding: mob ? 14 : 20 }}>
        {pend > 0 && (
          <div className="fu" style={{ background:C.acBg, borderRadius:14, padding:18, marginBottom:16, border:`1px solid #86EFAC` }}>
            <div style={{ fontSize:24, marginBottom:6 }}>👋</div>
            <div style={{ fontSize:17, fontWeight:800, color:C.ac }}>{pend} conteúdo{pend !== 1 ? "s" : ""} aguardando</div>
            <div style={{ fontSize:12, color:C.t2, marginTop:4 }}>Toque para ver e aprovar</div>
          </div>
        )}
        <Lbl>Conteúdos</Lbl>
        {cp.length === 0 && <div style={{ textAlign:"center", padding:32, color:C.t3 }}><div style={{ fontSize:36 }}>📭</div><p style={{ marginTop:8 }}>Nenhum conteúdo</p></div>}
        {cp.map((p, i) => (
          <div key={p.id} onClick={() => setSel(p)} className="fu lift" style={{
            display:"flex", alignItems:"center", gap:12, padding:14,
            background:C.white, borderRadius:12, border:`1px solid ${C.bd}`,
            marginBottom:6, cursor:"pointer", animationDelay:`${i * 30}ms`,
          }}>
            <div style={{ width:48, height:48, borderRadius:10, flexShrink:0, overflow:"hidden", background:C.s1, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, border:`1px solid ${C.bd}` }}>
              {p.media?.length > 0
                ? (p.media[0].type?.startsWith("video/")
                  ? <video src={p.media[0].data} muted style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : <img src={p.media[0].data} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />)
                : TY[p.type]?.ic
              }
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</div>
              <div style={{ fontSize:10, color:C.t3, marginTop:2 }}>{p.date} · {TY[p.type]?.l}</div>
            </div>
            <Tag status={p.status} small />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ NEW POST ═══ */
function NewPost({ clients, team, sel, onSubmit, onCancel }) {
  const [f, setF] = useState({ clientId: sel || clients[0]?.id || "", title:"", date:"2026-03-16", type:"feed", status:"draft", caption:"", media:[], assignee:"" });
  return (
    <>
      <div style={{ marginBottom:12 }}><Lbl>Cliente</Lbl><select value={f.clientId} onChange={e => setF({ ...f, clientId:e.target.value })} style={inp}>{clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
      <div style={{ marginBottom:12 }}><Lbl>Título</Lbl><input value={f.title} onChange={e => setF({ ...f, title:e.target.value })} placeholder="Ex: Ofertas da Semana" style={inp} /></div>
      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        <div style={{ flex:1 }}><Lbl>Data</Lbl><input type="date" value={f.date} onChange={e => setF({ ...f, date:e.target.value })} style={inp} /></div>
        <div style={{ flex:1 }}><Lbl>Formato</Lbl><select value={f.type} onChange={e => setF({ ...f, type:e.target.value })} style={inp}>{Object.entries(TY).map(([k, v]) => <option key={k} value={k}>{v.ic} {v.l}</option>)}</select></div>
      </div>
      <div style={{ marginBottom:12 }}><Lbl>Responsável</Lbl><select value={f.assignee} onChange={e => setF({ ...f, assignee:e.target.value })} style={inp}><option value="">Selecione...</option>{team.map(t => <option key={t.id} value={t.id}>{t.name} — {t.role}</option>)}</select></div>
      <div style={{ marginBottom:12 }}><Lbl>Legenda</Lbl><textarea value={f.caption} onChange={e => setF({ ...f, caption:e.target.value })} placeholder="Legenda do post..." rows={3} style={{ ...inp, resize:"vertical", lineHeight:1.5 }} /></div>
      <div style={{ marginBottom:14 }}><MediaUp media={f.media} onChange={up => { const nm = typeof up === "function" ? up(f.media) : up; setF(prev => ({ ...prev, media: nm })); }} max={5} /></div>
      <div style={{ display:"flex", gap:6 }}>
        <button onClick={() => { if (f.title.trim()) onSubmit(f); }} className="tap" style={{ flex:1, padding:12, borderRadius:10, border:"none", fontWeight:700, fontSize:14, background:C.ac, color:"#fff", cursor:"pointer" }}>Criar Conteúdo</button>
        <button onClick={onCancel} className="tap" style={{ padding:"12px 16px", borderRadius:10, background:C.s1, border:`1px solid ${C.bd}`, color:C.t2, fontWeight:600, cursor:"pointer" }}>Cancelar</button>
      </div>
    </>
  );
}

/* ═══ NEW DEMAND ═══ */
function NewDemand({ clients, team, sel, onSubmit, onCancel }) {
  const [f, setF] = useState({ clientId: sel || clients[0]?.id || "", type:"feed", title:"", description:"", assignee:"", status:"new", priority:"medium", deadline:"", files:[], links:[""] });
  const [fuid] = useState("df" + Math.random().toString(36).slice(2, 7));

  const procFiles = (fileList) => {
    Array.from(fileList).slice(0, 10 - (f.files?.length || 0)).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        setF(prev => ({ ...prev, files: [...prev.files, { type: file.type, name: file.name, data: e.target.result, size: file.size }] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = idx => setF(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== idx) }));
  const addLinkField = () => setF(prev => ({ ...prev, links: [...prev.links, ""] }));
  const updateLink = (idx, val) => setF(prev => ({ ...prev, links: prev.links.map((l, i) => i === idx ? val : l) }));
  const removeLink = idx => setF(prev => ({ ...prev, links: prev.links.filter((_, i) => i !== idx) }));

  const getFileIcon = (type, name) => {
    if (type?.startsWith("image/")) return "🖼️";
    if (type?.startsWith("video/")) return "🎬";
    if (type?.includes("pdf")) return "📄";
    if (type?.includes("word") || type?.includes("document") || name?.endsWith(".docx") || name?.endsWith(".doc")) return "📝";
    if (type?.includes("spreadsheet") || type?.includes("excel") || name?.endsWith(".xlsx")) return "📊";
    if (type?.includes("presentation") || name?.endsWith(".pptx")) return "📽️";
    return "📎";
  };

  const formatSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <>
      <div style={{ marginBottom:12 }}>
        <Lbl>Cliente</Lbl>
        <select value={f.clientId} onChange={e => setF({ ...f, clientId:e.target.value })} style={inp}>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div style={{ marginBottom:12 }}>
        <Lbl>Tipo de Entrega</Lbl>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {Object.entries(DT).map(([k, v]) => (
            <button key={k} onClick={() => setF({ ...f, type: k })} className="tap" style={{
              padding:"8px 14px", borderRadius:10, fontSize:12, fontWeight:600,
              border: f.type === k ? `2px solid ${C.ac}` : `1.5px solid ${C.bd}`,
              background: f.type === k ? C.acBg : C.white,
              color: f.type === k ? C.ac : C.t2, cursor:"pointer",
            }}>{v.ic} {v.l}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:12 }}>
        <Lbl>Título</Lbl>
        <input value={f.title} onChange={e => setF({ ...f, title:e.target.value })} placeholder="Ex: Post ofertas semana 25/03" style={inp} />
      </div>

      <div style={{ marginBottom:12 }}>
        <Lbl>Descrição</Lbl>
        <textarea value={f.description} onChange={e => setF({ ...f, description:e.target.value })} placeholder="Descreva o que precisa ser feito..." rows={3} style={{ ...inp, resize:"vertical", lineHeight:1.5 }} />
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        <div style={{ flex:1 }}>
          <Lbl>Responsável</Lbl>
          <select value={f.assignee} onChange={e => setF({ ...f, assignee:e.target.value })} style={inp}>
            <option value="">Selecione...</option>
            {team.map(t => <option key={t.id} value={t.id}>{t.name} — {t.role}</option>)}
          </select>
        </div>
        <div style={{ flex:1 }}>
          <Lbl>Prioridade</Lbl>
          <select value={f.priority} onChange={e => setF({ ...f, priority:e.target.value })} style={inp}>
            {Object.entries(PRIO).map(([k, v]) => <option key={k} value={k}>{v.l}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom:12 }}>
        <Lbl>📅 Prazo de Entrega</Lbl>
        <input type="date" value={f.deadline} onChange={e => setF({ ...f, deadline:e.target.value })} style={inp} />
      </div>

      {/* ═══ ARQUIVOS ═══ */}
      <div style={{ marginBottom:12 }}>
        <Lbl>📎 Arquivos ({f.files.length}/10)</Lbl>
        <div style={{ fontSize:10, color:C.t3, marginBottom:8 }}>Imagens, vídeos, PDFs, Word, Excel, qualquer arquivo</div>

        {/* File thumbnails */}
        {f.files.length > 0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:8 }}>
            {f.files.map((file, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", background:C.s1, borderRadius:8, border:`1px solid ${C.bd}` }}>
                <span style={{ fontSize:18 }}>{getFileIcon(file.type, file.name)}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{file.name}</div>
                  <div style={{ fontSize:10, color:C.t3 }}>{formatSize(file.size)}</div>
                </div>
                {/* Preview for images */}
                {file.type?.startsWith("image/") && (
                  <img src={file.data} alt="" style={{ width:32, height:32, borderRadius:6, objectFit:"cover", border:`1px solid ${C.bd}` }} />
                )}
                {file.type?.startsWith("video/") && (
                  <div style={{ width:32, height:32, borderRadius:6, background:"#000", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#fff" }}>▶</div>
                )}
                <button onClick={() => removeFile(i)} style={{ width:22, height:22, borderRadius:6, background:C.white, border:`1px solid ${C.bd}`, color:C.t3, fontSize:10, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>✕</button>
              </div>
            ))}
          </div>
        )}

        {/* Upload zone */}
        {f.files.length < 10 && (
          <div
            onClick={() => document.getElementById(fuid)?.click()}
            style={{ padding:"14px", borderRadius:10, textAlign:"center", cursor:"pointer", border:`1.5px dashed ${C.bd2}`, background:C.s1 }}
          >
            <div style={{ fontSize:16, opacity:0.4 }}>📤</div>
            <div style={{ fontSize:12, fontWeight:600, color:C.t2, marginTop:2 }}>Toque para enviar arquivos</div>
            <div style={{ fontSize:10, color:C.t3, marginTop:2 }}>Fotos, vídeos, PDF, Word, Excel, qualquer formato</div>
            <input
              id={fuid}
              type="file"
              accept="*/*"
              multiple
              onChange={e => { procFiles(e.target.files); e.target.value = ""; }}
              style={{ display:"none" }}
            />
          </div>
        )}
      </div>

      {/* ═══ LINKS ═══ */}
      <div style={{ marginBottom:14 }}>
        <Lbl>🔗 Links (Drive, referências, etc)</Lbl>
        {f.links.map((link, i) => (
          <div key={i} style={{ display:"flex", gap:6, marginBottom:6 }}>
            <input
              value={link}
              onChange={e => updateLink(i, e.target.value)}
              placeholder="https://drive.google.com/... ou qualquer URL"
              style={{ ...inp, flex:1, fontSize:12, padding:"8px 12px" }}
            />
            <button onClick={() => removeLink(i)} style={{ width:32, borderRadius:8, background:C.s1, border:`1px solid ${C.bd}`, color:C.t3, fontSize:10, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>✕</button>
          </div>
        ))}
        <button onClick={addLinkField} className="tap" style={{ padding:"6px 12px", borderRadius:8, background:C.s1, border:`1px solid ${C.bd}`, color:C.t3, fontSize:11, fontWeight:600, cursor:"pointer" }}>
          + Adicionar link
        </button>
      </div>

      <div style={{ display:"flex", gap:6 }}>
        <button onClick={() => {
          if (f.title.trim()) {
            const cleanLinks = f.links.filter(l => l.trim());
            onSubmit({ ...f, links: cleanLinks });
          }
        }} className="tap" style={{ flex:1, padding:12, borderRadius:10, border:"none", fontWeight:700, fontSize:14, background:C.ac, color:"#fff", cursor:"pointer" }}>
          Criar Demanda
        </button>
        <button onClick={onCancel} className="tap" style={{ padding:"12px 16px", borderRadius:10, background:C.s1, border:`1px solid ${C.bd}`, color:C.t2, fontWeight:600, cursor:"pointer" }}>Cancelar</button>
      </div>
    </>
  );
}
