/* ============================================
   シェア画像生成
   Canvas APIを使用してSNS用画像を生成
   ============================================ */

// シェア画像を生成してダウンロード
async function generateShareImage(result) {
    const canvas = document.getElementById('shareCanvas');
    const ctx = canvas.getContext('2d');
    
    // キャンバスサイズ（Instagram推奨サイズ）
    const width = 1080;
    const height = 1350;
    
    // 背景グラデーション
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1a0a0a');
    gradient.addColorStop(0.3, '#2d1215');
    gradient.addColorStop(0.7, '#3d1a1f');
    gradient.addColorStop(1, '#1a0a0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 装飾的な円
    ctx.beginPath();
    ctx.arc(width * 0.2, height * 0.15, 200, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212, 175, 55, 0.03)';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.85, 250, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(196, 30, 58, 0.05)';
    ctx.fill();
    
    // フォント設定
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // ヘッダー：年と装飾
    ctx.fillStyle = '#D4AF37';
    ctx.font = '36px "Shippori Mincho", serif';
    ctx.fillText('🎍  2026年  🎍', width / 2, 80);
    
    ctx.font = '48px "Shippori Mincho", serif';
    ctx.fillStyle = '#FFFEF8';
    ctx.fillText('新春おみくじ', width / 2, 150);
    
    // おみくじ用紙の背景
    const paperX = 80;
    const paperY = 220;
    const paperWidth = width - 160;
    const paperHeight = 980;
    
    // 紙の影
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    roundRect(ctx, paperX + 10, paperY + 10, paperWidth, paperHeight, 20);
    ctx.fill();
    
    // 紙本体
    const paperGradient = ctx.createLinearGradient(paperX, paperY, paperX, paperY + paperHeight);
    paperGradient.addColorStop(0, '#FFFEF8');
    paperGradient.addColorStop(1, '#FFF8E7');
    ctx.fillStyle = paperGradient;
    roundRect(ctx, paperX, paperY, paperWidth, paperHeight, 20);
    ctx.fill();
    
    // 紙の枠線
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.lineWidth = 2;
    roundRect(ctx, paperX + 20, paperY + 20, paperWidth - 40, paperHeight - 40, 15);
    ctx.stroke();
    
    // 運勢ラベル
    ctx.fillStyle = '#9B2335';
    ctx.font = '32px "Shippori Mincho", serif';
    ctx.fillText('運　勢', width / 2, paperY + 80);
    
    // 運勢（大きく）
    ctx.font = 'bold 140px "Shippori Mincho", serif';
    
    // 大吉は特別な色
    if (result.fortune.id === 'daikichi') {
        const fortuneGradient = ctx.createLinearGradient(
            width / 2 - 100, paperY + 180,
            width / 2 + 100, paperY + 280
        );
        fortuneGradient.addColorStop(0, '#C41E3A');
        fortuneGradient.addColorStop(0.5, '#D4AF37');
        fortuneGradient.addColorStop(1, '#C41E3A');
        ctx.fillStyle = fortuneGradient;
    } else if (result.fortune.id === 'kyo' || result.fortune.id === 'daikyo') {
        ctx.fillStyle = '#4A4A4A';
    } else {
        ctx.fillStyle = '#C41E3A';
    }
    
    ctx.fillText(result.fortune.name, width / 2, paperY + 220);
    
    // 和歌セクション背景
    const wakaY = paperY + 320;
    ctx.fillStyle = 'rgba(139, 69, 19, 0.05)';
    roundRect(ctx, paperX + 60, wakaY, paperWidth - 120, 280, 15);
    ctx.fill();
    
    // 和歌装飾
    ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.font = '40px serif';
    ctx.fillText('〽', paperX + 100, wakaY + 40);
    ctx.fillText('〽', paperX + paperWidth - 100, wakaY + 240);
    
    // 和歌テキスト
    ctx.fillStyle = '#1C1C1C';
    ctx.font = '38px "Shippori Mincho", serif';
    ctx.fillText(result.waka.kami, width / 2, wakaY + 80);
    ctx.fillText(result.waka.shimo, width / 2, wakaY + 140);
    
    // 作者
    ctx.fillStyle = '#666666';
    ctx.font = '28px "Shippori Mincho", serif';
    ctx.textAlign = 'right';
    ctx.fillText(`― ${result.waka.author}`, paperX + paperWidth - 100, wakaY + 220);
    ctx.textAlign = 'center';
    
    // 運勢詳細
    const detailsY = wakaY + 320;
    const detailItems = [
        { icon: '💕', label: '恋愛', value: result.details.love },
        { icon: '💼', label: '仕事', value: result.details.work },
        { icon: '💰', label: '金運', value: result.details.money },
        { icon: '🏥', label: '健康', value: result.details.health }
    ];
    
    ctx.font = '28px "Shippori Mincho", serif';
    detailItems.forEach((item, index) => {
        const y = detailsY + index * 60;
        
        // アイコンとラベル
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1C1C1C';
        ctx.fillText(`${item.icon}  ${item.label}`, paperX + 100, y);
        
        // 値（長い場合は切り詰め）
        ctx.textAlign = 'left';
        ctx.fillStyle = '#333333';
        let valueText = item.value;
        if (ctx.measureText(valueText).width > 500) {
            while (ctx.measureText(valueText + '…').width > 500) {
                valueText = valueText.slice(0, -1);
            }
            valueText += '…';
        }
        ctx.fillText(valueText, paperX + 240, y);
    });
    
    ctx.textAlign = 'center';
    
    // ラッキーアイテムセクション
    const luckyY = detailsY + 280;
    
    // 背景
    const luckyGradient = ctx.createLinearGradient(paperX + 60, luckyY, paperX + paperWidth - 60, luckyY);
    luckyGradient.addColorStop(0, 'rgba(212, 175, 55, 0.1)');
    luckyGradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.2)');
    luckyGradient.addColorStop(1, 'rgba(212, 175, 55, 0.1)');
    ctx.fillStyle = luckyGradient;
    roundRect(ctx, paperX + 60, luckyY, paperWidth - 120, 100, 15);
    ctx.fill();
    
    // ラッキーアイテム
    ctx.font = '26px "Shippori Mincho", serif';
    ctx.fillStyle = '#666666';
    
    const luckyItems = [
        { label: '🎨 色', value: result.lucky.color.name, color: result.lucky.color.code },
        { label: '🔢 数', value: result.lucky.number.toString() },
        { label: '🧭 方位', value: result.lucky.direction }
    ];
    
    const luckySpacing = (paperWidth - 120) / 3;
    luckyItems.forEach((item, index) => {
        const x = paperX + 60 + luckySpacing * (index + 0.5);
        ctx.fillStyle = '#666666';
        ctx.fillText(item.label, x, luckyY + 35);
        
        ctx.font = '32px "Shippori Mincho", serif';
        ctx.fillStyle = item.color || '#9B2335';
        ctx.fillText(item.value, x, luckyY + 75);
        ctx.font = '26px "Shippori Mincho", serif';
    });
    
    // フッター
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '28px "Shippori Mincho", serif';
    ctx.fillText('𝕏 @Tsubaki_Yutaka', width / 2, height - 60);
    
    // 画像をダウンロード
    downloadCanvas(canvas);
}

// 角丸四角形を描画するヘルパー関数
function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

// Canvasを画像としてダウンロード
function downloadCanvas(canvas) {
    // DataURLを取得
    const dataUrl = canvas.toDataURL('image/png');
    
    // ダウンロードリンクを作成
    const link = document.createElement('a');
    link.download = `omikuji_2026_${Date.now()}.png`;
    link.href = dataUrl;
    
    // クリックしてダウンロード
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

