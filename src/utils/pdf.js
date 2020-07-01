import jsPDF from 'jspdf';

export const exportAsPdf = (text) => () => {
    const fonts = ["helvetica", "neue"];
    const unit = "in";
    const pageWidth = 8.5;
    const lineHeight = 1.2;
    const margin = 0.5;
    const maxLineWidth = pageWidth - margin * 2;
    const fontSize = 20;
    const ptsPerInch = 72;
    const oneLineHeight = (fontSize * lineHeight) / ptsPerInch;

    const doc = new jsPDF({
        unit: unit,
        lineHeight: lineHeight
    }).setProperties({ title: "thingey" });
    // const textLines = doc
    //     .splitTextToSize(text(), maxLineWidth);
    doc.setFontSize(...fonts);
    doc.setFontSize(fontSize);
    doc.text(text(), margin, margin + 2 * oneLineHeight);
    const today = new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
    doc.save(`My Daily Planner-${today}`);
}