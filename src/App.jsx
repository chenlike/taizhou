import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'

import coverBg from './assets/神仙居.png'
import ziyangStreet from './assets/紫阳街1.jpeg'
import haitaibing from './assets/紫阳街吃的_海苔饼.png'
import danqingyangwei from './assets/紫阳街吃的_蛋清羊尾.png'
import maixia from './assets/紫阳街吃的_麦虾.png'
import wufanmaci from './assets/紫阳街吃的_乌饭麻糍.png'
import bowuguan from './assets/台州府城博物馆.png'
import renminyinhang from './assets/中国人民银行台州分行旧址.png'
import wenmiao from './assets/台州府文庙.png'
import chengqiang from './assets/台州府城墙.png'
import fucheng from './assets/台州府城.png'
import shasundoumian from './assets/荣小馆紫阳街店_沙蒜豆面.png'
import dahuangyu from './assets/荣小馆紫阳街店_家烧大黄鱼.png'
import shenxianju from './assets/神仙居.png'
import guanyinfeng from './assets/神仙居_观音峰.png'
import ruyiqiao from './assets/神仙居_如意桥.png'
import nantianding from './assets/神仙居_南天顶观景台.png'
import xiaolongbao from './assets/嵊州_小笼包.png'
import chaoniangao from './assets/嵊州_炒年糕.png'

const STOPS = [
  { id: 0, place: '出发', time: '10:30', emoji: '🚗' },
  { id: 1, place: '紫阳街', time: '12:00', emoji: '🍜' },
  { id: 2, place: '府城墙', time: '下午', emoji: '🏯' },
  { id: 3, place: '仙居', time: '傍晚', emoji: '🌙' },
  { id: 4, place: '神仙居', time: 'DAY2', emoji: '⛰️' },
  { id: 5, place: '仙境', time: '山顶', emoji: '🏔️' },
  { id: 6, place: '嵊州', time: '晚间', emoji: '🥟' },
]

const NODE_Y = [7, 22, 36, 51, 65, 78, 90]
const NODE_X = ['50%', '32%', '68%', '32%', '68%', '32%', '50%']

const SEGMENTS = [
  'M 36 7 C 38 11, 20 17, 23 22',
  'M 23 22 C 28 27, 43 31, 49 36',
  'M 49 36 C 40 41, 20 46, 23 51',
  'M 23 51 C 30 57, 43 60, 49 65',
  'M 49 65 C 40 70, 20 74, 23 78',
  'M 23 78 C 30 83, 33 86, 36 90',
]

function RoutePanel({ active }) {
  return (
    <aside className="route-panel">
      <div className="route-bg" />

      <svg className="route-svg" viewBox="0 0 72 100" preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path
          d={SEGMENTS.join(' ')}
          fill="none"
          stroke="rgba(196,155,69,0.08)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={SEGMENTS.join(' ')}
          fill="none"
          stroke="var(--track)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={SEGMENTS.join(' ')}
          fill="none"
          stroke="rgba(196,155,69,0.12)"
          strokeWidth="3"
          strokeDasharray="1 12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {active > 0 && (
          <>
            <path
              d={SEGMENTS.slice(0, active).join(' ')}
              fill="none"
              stroke="rgba(196,155,69,0.14)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
            <path
              d={SEGMENTS.slice(0, active).join(' ')}
              fill="none"
              stroke="var(--track-done)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={SEGMENTS.slice(0, active).join(' ')}
              fill="none"
              stroke="rgba(196,155,69,0.2)"
              strokeWidth="5"
              strokeDasharray="1 14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
        {active > 0 && (
          <path
            d={SEGMENTS[active - 1]}
            fill="none"
            stroke="var(--active)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.25"
            filter="url(#glow-strong)"
          />
        )}
      </svg>

      <div className="route-divider" style={{ top: '58%' }}>
        <span className="divider-label top">DAY 1</span>
        <div className="divider-dash" />
        <span className="divider-label bottom">DAY 2</span>
      </div>

      {STOPS.map((stop, i) => {
        const isPast = i < active
        const isCurrent = i === active
        return (
          <div
            key={stop.id}
            className={`route-node${isPast ? ' past' : ''}${isCurrent ? ' current' : ''}`}
            style={{ top: `${NODE_Y[i]}%`, left: NODE_X[i] }}
          >
            <div className="node-dot">
              {isPast || isCurrent ? (
                <span className="node-emoji">{stop.emoji}</span>
              ) : (
                <span className="node-empty" />
              )}
            </div>
            <span className="node-label">{stop.place}</span>
            <span className="node-time">{stop.time}</span>
          </div>
        )
      })}

      <motion.div
        className="route-car"
        animate={{ top: `${NODE_Y[active]}%`, left: NODE_X[active] }}
        transition={{ type: 'spring', stiffness: 70, damping: 18, mass: 0.8 }}
      >
        <span className="car-body">🚗</span>
        <div className="car-trail" />
      </motion.div>
    </aside>
  )
}

function Section0() {
  return (
    <section className="snap-section cover-section" data-index={0}>
      <motion.div
        className="cover-bg-img"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img src={coverBg} alt="" />
      </motion.div>

      <motion.div
        className="cover-float cover-float-1"
        animate={{ y: [0, -18, 0], x: [0, 6, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >⛰️</motion.div>
      <motion.div
        className="cover-float cover-float-2"
        animate={{ y: [0, -24, 0], x: [0, -10, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >🏯</motion.div>
      <motion.div
        className="cover-float cover-float-3"
        animate={{ y: [0, -14, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >🍜</motion.div>
      <motion.div
        className="cover-float cover-float-4"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >✨</motion.div>
      <motion.div
        className="cover-float cover-float-5"
        animate={{ y: [0, -16, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >🌸</motion.div>

      <motion.div
        className="cover-content"
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
      >
        <span className="cover-tag">两天一夜</span>
        <h1 className="cover-title">
          浙江 · 台州
          <span className="cover-en">TAIZHOU</span>
        </h1>
        <p className="cover-line">烟火府城 · 仙居人间</p>
      </motion.div>
      <motion.div
        className="cover-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>向下出发</span>
        <div className="cover-scroll-dot" />
      </motion.div>
    </section>
  )
}

function Section1() {
  return (
    <section className="snap-section" data-index={1}>
      <div className="page">
        <div className="page-badge d1">DAY 1 · 上午</div>
        <h2 className="page-title">出发，向临海</h2>

        <motion.div
          className="page-banner"
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <img src={ziyangStreet} alt="紫阳古街" />
        </motion.div>

        <motion.div
          className="page-card drive-card"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          viewport={{ once: true }}
        >
          <div className="drive-row">
            <span className="drive-dot from" />
            <span className="drive-label">宁波</span>
            <div className="drive-line" />
            <span className="drive-time">~2h</span>
            <div className="drive-line" />
            <span className="drive-dot to" />
            <span className="drive-label">临海</span>
          </div>
        </motion.div>

        <motion.div
          className="page-card highlight d1"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          viewport={{ once: true }}
        >
          <h3>🍜 紫阳古街 · 吃吃吃</h3>
          <p>12:00-12:30 抵达，千年古街青石板路蜿蜒向前，两侧热气腾腾的小吃摊一字排开。海苔饼的焦香、蛋清羊尾的甜糯、麦虾面的鲜浓……一条街吃到饱。</p>
        </motion.div>

        <motion.div
          className="img-grid-2"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div className="img-card" initial={{ opacity: 0, scale: 0.72, rotate: -3 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}><img src={haitaibing} alt="海苔饼" /><span>海苔饼</span></motion.div>
          <motion.div className="img-card" initial={{ opacity: 0, scale: 0.72, rotate: -3 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}><img src={danqingyangwei} alt="蛋清羊尾" /><span>蛋清羊尾</span></motion.div>
          <motion.div className="img-card" initial={{ opacity: 0, scale: 0.72, rotate: -3 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.34, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}><img src={maixia} alt="麦虾" /><span>麦虾面</span></motion.div>
          <motion.div className="img-card" initial={{ opacity: 0, scale: 0.72, rotate: -3 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}><img src={wufanmaci} alt="乌饭麻糍" /><span>乌饭麻糍</span></motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Section2() {
  return (
    <section className="snap-section" data-index={2}>
      <div className="page">
        <div className="page-badge d1">DAY 1 · 下午</div>
        <h2 className="page-title">探千年府城</h2>

        <motion.div
          className="page-banner"
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <img src={chengqiang} alt="台州府城墙" />
        </motion.div>

        <motion.div
          className="page-card highlight d1"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          viewport={{ once: true }}
        >
          <h3>🏯 府城漫步路线</h3>
          <p>博物馆 → 人行旧址 → 文庙 → 朝天门上城墙。体力好继续走到揽胜门，俯瞰东湖与灵江。</p>
        </motion.div>

        <motion.div
          className="page-card"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          viewport={{ once: true }}
        >
          <div className="card-row">
            <div className="card-thumb">
              <img src={bowuguan} alt="台州府城墙博物馆" />
            </div>
            <div>
              <h3>① 台州府城墙博物馆</h3>
              <p>紫阳街旁，馆藏跨越新石器到明清。半小时立体认识千年古城。</p>
              <span className="tag green">walk walk~</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="page-card"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="card-row">
            <div className="card-thumb">
              <img src={renminyinhang} alt="中国人民银行台州支行旧址" />
            </div>
            <div>
              <h3>② 中国人民银行台州支行旧址</h3>
              <p>民国风格建筑，顺路一逛。老街深处的金融旧梦，拍照很出片。</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="page-card"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
          viewport={{ once: true }}
        >
          <div className="card-row">
            <div className="card-thumb">
              <img src={wenmiao} alt="台州府文庙" />
            </div>
            <div>
              <h3>③ 台州府文庙</h3>
              <p>从旧址往东不远，规模不大但保存完整。红墙古柏，闹中取静。</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="page-card"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
          viewport={{ once: true }}
        >
          <div className="card-row">
            <div className="card-thumb">
              <img src={fucheng} alt="台州府城" />
            </div>
            <div>
              <h3>④ 朝天门 · 上台州府城墙</h3>
              <p>文庙往北即达。"江南八达岭"，依山临江。登城远眺灵江如练。</p>
              <span className="tag gold">看体力</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

function Section3() {
  return (
    <section className="snap-section" data-index={3}>
      <div className="page">
        <div className="page-badge d1">DAY 1 · 傍晚</div>
        <h2 className="page-title">晚餐 & 转场</h2>

        <motion.div
          className="page-card highlight d1"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h3>荣小馆 · 紫阳街店</h3>
          <p>新荣记旗下品牌。逛累了坐下慢慢享用，推荐沙蒜豆面、黄金脆带鱼、姜汁调蛋。</p>
        </motion.div>

        <motion.div
          className="img-grid-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          viewport={{ once: true }}
        >
          <motion.div className="img-card tall" initial={{ opacity: 0, scale: 0.78, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}><img src={shasundoumian} alt="沙蒜豆面" /><span>沙蒜豆面</span></motion.div>
          <motion.div className="img-card tall" initial={{ opacity: 0, scale: 0.78, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}><img src={dahuangyu} alt="家烧大黄鱼" /><span>家烧大黄鱼</span></motion.div>
        </motion.div>

        <motion.div
          className="page-card"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="card-row">
            <span className="card-icon-lg">🏨</span>
            <div>
              <h3>驱车前往仙居</h3>
              <p>晚餐后开车约1小时，入住<strong>吾悦广场附近酒店</strong>（待定），养精蓄锐。</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Section4() {
  return (
    <section className="snap-section" data-index={4}>
      <div className="page">
        <div className="page-badge d2">DAY 2</div>
        <h2 className="page-title">登临神仙居</h2>

        <motion.div
          className="page-banner"
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <img src={shenxianju} alt="神仙居" />
        </motion.div>

        <motion.div
          className="page-card highlight d2"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          viewport={{ once: true }}
        >
          <h3>⛰️ 睡到自然醒 · 看精力出发</h3>
          <p>南门进，索道+电梯直达上山，省力尽览精华。山顶栈道平缓，边走边拍约<strong>4小时</strong>。</p>
        </motion.div>

        <motion.div
          className="page-card"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          viewport={{ once: true }}
        >
          <div className="card-row">
            <span className="card-icon-lg">🚡</span>
            <div>
              <h3>南天索道 + 电梯</h3>
              <p>缆车缓缓上升，林海脚下翻涌。再加山体电梯，轻松登顶无需爬升。</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Section5() {
  return (
    <section className="snap-section" data-index={5}>
      <div className="page">
        <div className="page-badge d2">DAY 2 · 山顶</div>
        <h2 className="page-title">仙境漫步</h2>

        <motion.div
          className="page-banner"
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <img src={ruyiqiao} alt="如意桥" />
        </motion.div>

        <motion.div
          className="img-grid-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          viewport={{ once: true }}
        >
          <motion.div className="img-card" initial={{ opacity: 0, scale: 0.78, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}><img src={guanyinfeng} alt="观音峰" /><span>观音峰</span></motion.div>
          <motion.div className="img-card" initial={{ opacity: 0, scale: 0.78, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}><img src={nantianding} alt="南天顶观景台" /><span>南天顶</span></motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Section6() {
  return (
    <section className="snap-section" data-index={6}>
      <div className="page">
        <div className="page-badge d2">DAY 2 · 晚间</div>
        <h2 className="page-title">嵊州晚饭 · 返程</h2>

        <motion.div
          className="page-card highlight d2"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h3>🥟 路过嵊州，犒劳自己</h3>
          <p>神仙居返程顺路，<strong>富豪街</strong>或其他热闹老街吃个晚饭。小笼包、炒年糕、榨面，嵊州小吃绝不踩雷。</p>
        </motion.div>

        <motion.div
          className="img-grid-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          viewport={{ once: true }}
        >
          <motion.div className="img-card tall" initial={{ opacity: 0, scale: 0.78, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}><img src={xiaolongbao} alt="嵊州小笼包" /><span>小笼包</span></motion.div>
          <motion.div className="img-card tall" initial={{ opacity: 0, scale: 0.78, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}><img src={chaoniangao} alt="嵊州炒年糕" /><span>炒年糕</span></motion.div>
        </motion.div>

        <motion.div
          className="page-card end-card"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="end-icon">🏠</span>
          <p>吃饱喝足，驶回<strong>宁波</strong></p>
          <p className="end-sub">台州之旅 · 圆满结束</p>
        </motion.div>
      </div>
    </section>
  )
}

const SECTIONS = [Section0, Section1, Section2, Section3, Section4, Section5, Section6]

function App() {
  const [active, setActive] = useState(0)
  const contentRef = useRef(null)

  const handleScroll = useCallback(() => {
    const el = contentRef.current
    if (!el) return
    const h = el.clientHeight
    const idx = Math.round(el.scrollTop / h)
    setActive(Math.max(0, Math.min(idx, 6)))
  }, [])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className="app">
      <RoutePanel active={active} />
      <main className="content-panel" ref={contentRef}>
        {SECTIONS.map((Section, i) => (
          <Section key={i} />
        ))}
      </main>
    </div>
  )
}

export default App
