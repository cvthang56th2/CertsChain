const PDFDocument = require('pdfkit');
const fs = require('fs');
const qrCode = require('qrcode')

const certsPath = 'public/certs'

// https://github.com/eduqg/pdfkit-node-certificate-template
const generateCertPdf = async (certiData = {}) => {
  const { user, school, cource} = certiData
  const doc = new PDFDocument({
    layout: 'landscape',
    size: 'A4',
  });

  // Helper to move to next line
  function jumpLine(doc, lines) {
    for (let index = 0; index < lines; index++) {
      doc.moveDown();
    }
  }

  if (!fs.existsSync(certsPath)){
    fs.mkdirSync(certsPath);
  }
  const userName = [user.firstName, user.lastName].filter(Boolean).join(' ')

  const certFileName = `certificate-${userName}-${school.name}-${cource.name}-${cource.time}-${new Date().getTime()}.pdf`.trim().replace(/ /g, '_')

  doc.pipe(fs.createWriteStream(`${certsPath}/${certFileName}`));

  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');

  doc.fontSize(10);

  // Margin
  const distanceMargin = 18;

  doc
    .fillAndStroke('#0e8cc3')
    .lineWidth(20)
    .lineJoin('round')
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2,
    )
    .stroke();

  // Header
  const maxWidth = 140;
  const maxHeight = 70;

  doc.image('./public/assets/winners.png', doc.page.width / 2 - maxWidth / 2, 60, {
    fit: [maxWidth, maxHeight],
    align: 'center',
  });

  jumpLine(doc, 5)

  doc
    .font('./public/fonts/NotoSansJP-Bold.otf')
    .fontSize(14)
    .fill('#021c27')
    .text(school.name, {
      align: 'center',
    });

  jumpLine(doc, 2)

  // Content
  doc
    .font('./public/fonts/NotoSansJP-Regular.otf')
    .fontSize(16)
    .fill('#021c27')
    .text('CERTIFICATE OF COMPLETION', {
      align: 'center',
    });

  jumpLine(doc, 1)

  doc
    .font('./public/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Present to', {
      align: 'center',
    });

  jumpLine(doc, 2)

  doc
    .font('./public/fonts/NotoSansJP-Bold.otf')
    .fontSize(24)
    .fill('#021c27')
    .text(`${user.gender === 'female' ? 'Mrs' : 'Mr'}. ${userName}`, {
      align: 'center',
    });

  jumpLine(doc, 1)

  doc
    .font('./public/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(`Has been successfully completed the Course: ${cource.name} - ${cource.time}`, {
      align: 'center',
    });

  jumpLine(doc, 7)

  doc.lineWidth(1);

  // Signatures
  const lineSize = 174;
  const signatureHeight = 390;

  doc.fillAndStroke('#021c27');
  doc.strokeOpacity(0.2);

  const startLine1 = 128;
  const endLine1 = 128 + lineSize;
  doc
    .moveTo(startLine1, signatureHeight)
    .lineTo(endLine1, signatureHeight)
    .stroke();

  const startLine2 = endLine1 + 32;
  const endLine2 = startLine2 + lineSize;
  doc
    .moveTo(startLine2, signatureHeight)
    .lineTo(endLine2, signatureHeight)
    .stroke();

  const startLine3 = endLine2 + 32;
  const endLine3 = startLine3 + lineSize;
  doc
    .moveTo(startLine3, signatureHeight)
    .lineTo(endLine3, signatureHeight)
    .stroke();

  doc
    .font('./public/fonts/NotoSansJP-Bold.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(cource.teacherName, startLine1, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center',
    });

  doc
    .font('./public/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Teacher', startLine1, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center',
    });

  doc
    .font('./public/fonts/NotoSansJP-Bold.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(userName, startLine2, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center',
    });

  doc
    .font('./public/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Student', startLine2, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center',
    });

  doc
    .font('./public/fonts/NotoSansJP-Bold.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(school.directorName, startLine3, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center',
    });

  doc
    .font('./public/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Director', startLine3, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center',
    });

  jumpLine(doc, 4);

  // Validation link
  const link = `http://localhost:4000/certs/${certFileName}`;

  const linkWidth = doc.widthOfString(link);
  const linkHeight = doc.currentLineHeight();

  doc
    .underline(
      doc.page.width / 2 - linkWidth / 2,
      448,
      linkWidth,
      linkHeight,
      { color: '#021c27' },
    )
    .link(
      doc.page.width / 2 - linkWidth / 2,
      448,
      linkWidth,
      linkHeight,
      link,
    );

  doc
    .font('./public/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(
      link,
      doc.page.width / 2 - linkWidth / 2,
      448,
      linkWidth,
      linkHeight
    );

  // Footer
  const bottomHeight = doc.page.height - 120;
  const qrCodeImage = await qrCode.toDataURL(link)
  doc.image(qrCodeImage, doc.page.width / 2 - 30, bottomHeight, {
    fit: [80, 80],
  });

  doc.end();
  return link
}

module.exports ={
  generateCertPdf
}