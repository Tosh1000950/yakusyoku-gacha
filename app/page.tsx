'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Settings, Shuffle, Volume2, Zap, X } from 'lucide-react'

const WORD_POOL_VERSION = '2026-11-06-v4'

const initialPools = [
  '最強の/究極の/伝説の/幻の/奇跡の/黄金の/神の/無敵の/天才的/圧倒的/魅惑の/地球規模の/宇宙一の/異次元の/前代未聞の/限界突破の/最弱の/底辺の/呪われた/絶望の/悲劇の/終わってる/闇の/地獄の/破滅の/偽りの/炎上中の/訳ありの/限界の/違法な/禁断の/自称/謎の/歴代最高の/無敗の/光の/真の/絶対的な/至高の/銀河系の/国宝級の/人間国宝の/神に選ばれし/無双の/一騎当千の/奇跡を呼ぶ/規格外の/不滅の/覇王の/ミラクル/完璧の/崖っぷちの/ギリギリの/見掛け倒しの/インチキ/賞味期限切れの/オワコンの/三流の/哀しき/忘れ去られた/パチモンの/非公認の/無許可の/出禁になった/問題の/ヤバすぎる/前科持ちの/令和の/前世から続く/大いなる/未確認の/野生の/狂気の/虚無の/隣の/地下帝国の/天使の/昭和の/深海の/天空の',
  'はんかくさい/敏感な/かっこいい/しょげた/ピチピチした/馬鹿げた/くさい/ぱっぱらぱーな/強欲な/ハゲ散らかした/ムキムキ/びしょ濡れ/ぬるぬる/バキバキ/トゲトゲした/骨と皮だけ/プルプルした/ギラギラした/眠たげな/荒ぶる/ポンコツな/尊い/エモい/限界オタクな/意識高い/陽気な/陰キャな/荒んだ/ブルブル震える/ニチャァ…とした/脳筋/ぴえんな/ガチギレ/虚勢を張る/すぐ泣く/すぐ暴れる/すぐ発情する/すぐ蒸発する/すぐ走り出す/匂わせた/満面の笑みを浮かべた/イキった/メンヘラ/承認欲求高めな/地雷系/コミュ障な/パリピ/悟りを開いた/媚び売り/バグった/チー牛な/調子に乗った/すぐキョドる/震え声の/マウントを取りがちな/すぐ論破しようとする/バブみある/病みがちな/キレッキレな/沼った/テンパった/ベタベタした/テカテカした/カチカチ/フワフワ/ガリガリ/むっちりした/ペロペロしたい/泥まみれ/血まみれ/毛深い/ツルツル/ヨボヨボ/透け透け/輝かしい/ボロボロ/半裸/全裸/キメ顔/猫背な/足がつった/寝不足な/隣に住んでいる/隣の/タワマンに住んでる/貧民街出身の/スラム育ちの/池から出てきた/地面から生えた/腕が4本ある/頭よさげな/パッパラパーな/えろい/変態な/ゲラな/鼻毛が見えてる/耳毛が伸びてる/かぐわしい/なまらめんこい/ボインな/飲み物こぼしがちな/覚醒した/量産型/神聖/真性/爆裂/残念な',
  'ハゲタカ/ゴリラ/チワワ/アルパカ/クリオネ/ナマコ/カピバラ/ハイエナ/ミジンコ/珍獣/暴れ馬/ビーフシチュー/ちくわ/プロテイン/タワシ/消しゴム/三角コーン/ダンボール/割り箸/モバイルバッテリー/沼/概念/ろくでなし/野郎/勇者/妖精/おっさん/ギャル/ニート/社畜/配信者/廃人/魔法少女/黒幕/モブ/ぼっち/炎上請負人/仙人/スパイ/赤ちゃん/ナマケモノ/マンドリル/ハダカデバネズミ/ウーパールーパー/チンパンジー/サメ/ティラノサウルス/ハト/イカ/ダチョウ/深海魚/カメムシ/寄生虫/ブロッコリー/マヨネーズ/おしゃぶり/鉄アレイ/ルーター/課金アイテム/ガチャ石/メガホン/便座/仏像/タピオカ/エナジードリンク/ブルーシート/リコーダー/カスタネット/札束/巨匠/神絵師/石油王/フリーター/自宅警備員/クソガキ/老害/転生者/悪役令嬢/サイボーグ/AI/エラー/残像/ダミー/生贄/ATM/お母さん/お兄ちゃん/おじさん/友達/恋人/ヤリ友/幼馴染/元カノ/元カレ/親友/生き別れの兄/義理の妹/パパ活相手/推し/ストーカー/ご近所さん/担任の先生/初恋の人/愛人/宿敵/信者/アンチ/通りすがり/赤の他人/貴族/奴隷/氏族/豪族/皇族/武者/公爵/伯爵/落ち武者/大将/平民/農民/商人/足軽/将軍/殿様/姫/国王/皇帝/大魔王/村長/家老/影武者/浪人/大名/侯爵/子爵/男爵/騎士/神官/暗殺者/剣聖/エアコン/扇風機/冷蔵庫/洗濯機/電子レンジ/炊飯器/ルンバ/空気清浄機/ドライヤー/アイロン/こたつ/加湿器/除湿機/トースター/ホットプレート/ミキサー/シュレッダー/バリカン/電動歯ブラシ/マッサージチェア/食洗機/テレビ/パソコン/掃除機/ダンゴムシ/カタツムリ/カマキリ/ゾウ/エリマキトカゲ/アルマジロ/マグロ/シャチ/ラッコ/カブトムシ/クワガタ/ゴキブリ/セミ/カメレオン/イグアナ/パンダ/コアラ/キリン/サイ/カバ/ペンギン/ダイオウイカ/ウツボ/ジンベエザメ/リュウグウノツカイ/クラゲ/タラバガニ/伊勢海老/マンボウ/アザラシ/カラス/スズメバチ/ムカデ/エンジニア/配管工/ごみ収集員/鳶職/土方/社長/取締役/平社員/部長/課長/キャバ嬢/ホスト/YouTuber/Vtuber/プロゲーマー/コンビニ店員/タクシー運転手/弁護士/医者/占い師/マジシャン/ピエロ/スナイパー/探偵/SP/ボディガード/総理大臣/官僚/政治家/大工/漁師/農家/アイドル/地下アイドル/パンツ/ズボン/スカート/ブラジャー/スク水/ブルマ/セーラー服/ブレザー/学ラン/ジャージ/Tシャツ/パーカー/タキシード/ウェディングドレス/着物/ふんどし/ビキニ/競泳水着/メイド服/ナース服/網タイツ/ルーズソックス/オーバーオール/トランクス/ボクサーパンツ/ブリーフ/ネクタイ/靴下/長靴/ハイヒール',
].map((pool) => pool.split('/'))

function getActivePoolIndexes(columns: number) {
  return columns === 2 ? [1, 2] : [0, 1, 2]
}

function pickWords(pools: string[][], columns: number, rows: number) {
  return getActivePoolIndexes(columns).map((poolIndex) => {
    const pool = pools[poolIndex] ?? pools[0]
    return [...pool].sort(() => Math.random() - 0.5).slice(0, rows)
  })
}

let startAudio: HTMLAudioElement | null = null
let selectAudio: HTMLAudioElement | null = null
let select2Audio: HTMLAudioElement | null = null
let soundEnabled = true
let soundVolume = 0.5

type RouletteSound = "/start.mp3" | "/select.mp3" | "/select2.mp3"

function playAssetSound(source: RouletteSound) {
  if (!soundEnabled) return
  const audio = source === "/start.mp3"
    ? (startAudio ??= new Audio(source))
    : source === "/select.mp3"
      ? (selectAudio ??= new Audio(source))
      : (select2Audio ??= new Audio(source))
  audio.volume = soundVolume
  audio.currentTime = 0
  void audio.play().catch(() => undefined)
}

export default function Page() {
  const [columns, setColumns] = useState(3)
  const [rows, setRows] = useState(10)
  const [pools, setPools] = useState(initialPools)
  // Keep the server and first client render identical; randomize after hydration.
  const [grid, setGrid] = useState(() => initialPools.slice(0, 3).map((pool) => pool.slice(0, 10)))
  const [hydrated, setHydrated] = useState(false)
  const [activeRows, setActiveRows] = useState<number[]>([])
  const [spinning, setSpinning] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [displayScale, setDisplayScale] = useState<'compact' | 'standard' | 'large'>('standard')
  const [newWord, setNewWord] = useState<Record<number, string>>({})
  const [soundOn, setSoundOn] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setHydrated(true)
    setGrid(pickWords(initialPools, 3, 10))
  }, [])

  useEffect(() => {
    const saved = window.localStorage.getItem('role-roulette-settings')
    if (!saved) return
    try {
      const data = JSON.parse(saved)
      const savedColumns = data.columns === 2 ? 2 : 3
      const savedRows = [10, 15].includes(data.rows) ? data.rows : 15
      const savedScale = ['compact', 'standard', 'large'].includes(data.displayScale) ? data.displayScale : 'standard'
      const savedPools = data.poolVersion === WORD_POOL_VERSION && data.pools?.length === 3
        ? data.pools.map((pool: string[], index: number) => Array.from(new Set([...(pool ?? []), ...initialPools[index]])))
        : initialPools
      setColumns(savedColumns)
      setRows(savedRows)
      setDisplayScale(savedScale as 'compact' | 'standard' | 'large')
      setPools(savedPools)
      if (data.poolVersion !== WORD_POOL_VERSION) {
        window.localStorage.setItem('role-roulette-settings', JSON.stringify({
          ...data,
          poolVersion: WORD_POOL_VERSION,
          pools: initialPools,
        }))
      }
      setGrid(pickWords(savedPools, savedColumns, savedRows))
    } catch { /* keep defaults */ }
  }, [])

  useEffect(() => () => { if (intervalRef.current) clearTimeout(intervalRef.current) }, [])

  useEffect(() => {
    soundEnabled = soundOn
    soundVolume = volume
  }, [soundOn, volume])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !event.repeat && !settingsOpen) {
        event.preventDefault()
        spin()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const visibleColumns = useMemo(() => grid.slice(0, columns), [grid, columns])

  function reshuffle() {
    if (spinning) return
    setConfirmed(false)
    setGrid(pickWords(pools, columns, rows))
    setActiveRows([])
  }

  function spin() {
    if (spinning) return
    playAssetSound('/start.mp3')
    setSpinning(true)
    setConfirmed(false)
    const finalRows = Array.from({ length: columns }, () => Math.floor(Math.random() * rows))
    const duration = 3000 + Math.random() * 2000
    const stopOrder = Array.from({ length: columns }, (_, index) => index).sort(() => Math.random() - 0.5)
    const stopTimes = Array(columns).fill(0)
    stopOrder.forEach((columnIndex, orderIndex) => {
      const baseTime = duration * ((orderIndex + 1) / (columns + 1))
      stopTimes[columnIndex] = baseTime + Math.random() * Math.min(420, duration / (columns + 1))
    })

    let currentRows = Array(columns).fill(0)
    let stoppedColumns = Array(columns).fill(false)
    let stoppedCount = 0
    const startedAt = performance.now()
    setActiveRows(currentRows)

    function advance() {
      const elapsed = performance.now() - startedAt
      const nextRows = currentRows.map((row, columnIndex) => {
        if (stoppedColumns[columnIndex]) return row
        if (elapsed >= stopTimes[columnIndex] && row === finalRows[columnIndex]) {
          stoppedColumns[columnIndex] = true
          stoppedCount += 1
          playAssetSound(stoppedCount === columns ? '/select.mp3' : '/select2.mp3')
          return row
        }
        return (row + 1) % rows
      })

      currentRows = nextRows
      setActiveRows(nextRows)

      if (stoppedCount === columns) {
        if (intervalRef.current) clearTimeout(intervalRef.current)
        setSpinning(false)
        setConfirmed(true)
        return
      }

      playAssetSound('/select2.mp3')
      const progress = Math.min(1, elapsed / duration)
      const delay = 55 + Math.round(progress * progress * 230)
      intervalRef.current = setTimeout(advance, delay)
    }

    intervalRef.current = setTimeout(advance, 70)
  }

  function addWord(poolIndex: number) {
    const word = newWord[poolIndex]?.trim()
    if (!word) return
    setPools((current) => current.map((pool, index) => index === poolIndex ? [...pool, word] : pool))
    setNewWord((current) => ({ ...current, [poolIndex]: '' }))
  }

  function saveSettings() {
    window.localStorage.setItem('role-roulette-settings', JSON.stringify({ columns, rows, pools, displayScale, poolVersion: WORD_POOL_VERSION }))
    setGrid(pickWords(pools, columns, rows))
    setActiveRows([])
    setConfirmed(false)
    setSettingsOpen(false)
  }

  return (
    <main className={`roulette-app roulette-app--rows-${rows} roulette-app--${displayScale}`}>
      <div className="scanlines" aria-hidden="true" />
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark"><Zap aria-hidden="true" /></div>
          <div><span className="eyebrow">LIVE ROLE DRAW</span><h1>役職<span>ルーレット</span></h1></div>
        </div>
        <div className={`jackpot-lamp ${confirmed ? 'jackpot-lamp--flash' : ''}`} aria-live="polite">
          <span className="lamp-dot" /> <span>{confirmed ? '確　定！' : spinning ? '抽選中...' : 'READY'}</span>
        </div>
        <div className="header-actions">
          <button className="icon-button" onClick={() => setSettingsOpen(true)} aria-label="設定を開く"><Settings aria-hidden="true" /></button>
          <span className="live-badge"><i /> LIVE</span>
        </div>
      </header>

      <section className="hero-copy"><p className="kicker">SUPER ROLE JACKPOT</p><div className="hero-title-row"><h2>今日から<span>君は！！</span></h2><p className="creator-credit">Created by <strong>Tosh1</strong><span aria-hidden="true"> · </span><a href="https://x.com/Tosh1000950" target="_blank" rel="noreferrer">X / @Tosh1000950</a></p></div><p className="subcopy">列ごとにランダムで役職ワードが決定します</p></section>

      <section className={`machine ${confirmed ? 'machine--confirmed' : ''}`} aria-label="役職ルーレット">
        <div className="machine-top"><span className="machine-label">ROLE SELECTOR</span><span className="machine-count">{columns} COLUMNS / {rows} ROWS</span></div>
        <div className="grid-wrap" aria-busy={!hydrated} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {hydrated && visibleColumns.map((column, columnIndex) => (
            <div className="role-column" key={`column-${columnIndex}`}>
              <div className="column-head">STAGE {String(columnIndex + 1).padStart(2, '0')} <span>●</span></div>
              {column.map((word, rowIndex) => (
                <div className={`role-cell ${activeRows[columnIndex] === rowIndex ? 'role-cell--active' : ''} ${confirmed && activeRows[columnIndex] === rowIndex ? 'role-cell--winner' : ''}`} key={`${word}-${rowIndex}`}>
                  <span className="cell-index">{String(rowIndex + 1).padStart(2, '0')}</span><span>{word}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="machine-bottom"><span className="bar-light" /><span>SELECT YOUR DESTINY</span><span className="bar-light" /></div>
      </section>

<section className="controls" aria-label="ルーレット操作">
        <div className="control-buttons"><button className="secondary-button" onClick={reshuffle}><Shuffle aria-hidden="true" /> ワード再抽選</button>
        <button className={`spin-button ${spinning ? 'spin-button--spinning' : ''}`} onClick={spin} disabled={spinning}><Zap aria-hidden="true" /> {spinning ? '抽選中...' : confirmed ? '再ルーレット！' : '抽選スタート'}<span className="spin-button-ring" aria-hidden="true" /></button>
        <button className={`secondary-button sound-button ${soundOn ? '' : 'sound-button--off'}`} onClick={() => setSoundOn((current) => !current)} aria-pressed={soundOn}><Volume2 aria-hidden="true" /> サウンド {soundOn ? 'ON' : 'OFF'}</button></div>
        <label className="volume-control"><span>音量</span><input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="音量" /><output>{Math.round(volume * 100)}%</output></label>
      </section>
      <p className="tip">スペースキーでも抽選スタート <span>•</span> OBSのブラウザソースに対応</p>

      {settingsOpen && <div className="modal-backdrop" onClick={() => setSettingsOpen(false)}><section className="settings-modal" onClick={(event) => event.stopPropagation()} aria-modal="true" role="dialog" aria-labelledby="settings-title">
        <div className="modal-header"><div><span className="eyebrow">SYSTEM CONFIG</span><h3 id="settings-title">ルーレット設定</h3></div><button className="close-button" onClick={() => setSettingsOpen(false)} aria-label="設定を閉じる"><X aria-hidden="true" /></button></div>
        <div className="setting-group"><label>列数</label><div className="segmented">{[2, 3].map((value) => <button key={value} className={columns === value ? 'selected' : ''} onClick={() => setColumns(value)}>{value} 列</button>)}</div></div>
        <div className="setting-group"><label>行数</label><div className="segmented">{[10, 15].map((value) => <button key={value} className={rows === value ? 'selected' : ''} onClick={() => setRows(value)}>{value} 行</button>)}</div></div>
        <div className="setting-group"><label>表示サイズ</label><div className="segmented">{([['compact', '小さめ'], ['standard', '標準'], ['large', '大きめ']] as const).map(([value, label]) => <button key={value} className={displayScale === value ? 'selected' : ''} onClick={() => setDisplayScale(value)}>{label}</button>)}</div><small className="setting-hint">配信画面が小さい時は「小さめ」が見やすく収まります。</small></div>
        <div className="setting-group pool-group"><label>ワードプール <small>一覧編集・追加ができます</small></label>{getActivePoolIndexes(columns).map((poolIndex) => <div className="pool-editor" key={poolIndex}><div className="pool-editor-heading"><strong>{poolIndex + 1}列目</strong><span>{pools[poolIndex]?.length ?? 0}ワード</span></div><textarea value={(pools[poolIndex] ?? []).join('/')} onChange={(event) => setPools((current) => current.map((item, currentIndex) => currentIndex === poolIndex ? event.target.value.split('/').map((word) => word.trim()).filter(Boolean) : item))} aria-label={`${poolIndex + 1}列目のワード`} /><div className="quick-add"><input value={newWord[poolIndex] ?? ''} onChange={(event) => setNewWord((current) => ({ ...current, [poolIndex]: event.target.value }))} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); addWord(poolIndex) } }} placeholder="ワードを1つ追加" aria-label={`${poolIndex + 1}列目に追加するワード`} /><button type="button" onClick={() => addWord(poolIndex)}>追加</button></div></div>)}</div>
        <button className="save-button" onClick={saveSettings}>設定を保存して反映</button>
      </section></div>}
    </main>
  )
}
