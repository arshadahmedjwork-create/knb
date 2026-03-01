import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// We'll replace this with the actual base64 string
export const generateBrochure = (data: any, logoBase64: string) => {
    const doc = new jsPDF();

    // Branding Colors
    const onyx = [24, 24, 27]; // #18181b
    const brass = [200, 165, 80]; // #c8a550
    const offwhite = [245, 242, 234]; // #f5f2ea

    // 1. Add Logo
    if (logoBase64) {
        doc.addImage(logoBase64, "PNG", 14, 15, 20, 20); // Width, height position
    }

    // 2. Add Header text
    doc.setFontSize(24);
    doc.setTextColor(onyx[0], onyx[1], onyx[2]);
    doc.text("KNB Innovations", 40, 24);

    doc.setFontSize(10);
    doc.setTextColor(brass[0], brass[1], brass[2]);
    doc.text("PREMIUM INTERIOR ARCHITECTURE", 40, 30);

    // Divider Line
    doc.setDrawColor(brass[0], brass[1], brass[2]);
    doc.setLineWidth(0.5);
    doc.line(14, 40, 196, 40);

    // 3. User Greeting & Intro
    doc.setFontSize(16);
    doc.setTextColor(onyx[0], onyx[1], onyx[2]);
    doc.text(`Thank you, ${data.name || "Valued Client"}!`, 14, 55);

    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    const introText = "Here is a summary of your requested consultation and interior design preferences. We look forward to realizing your vision.";
    doc.text(introText, 14, 65, { maxWidth: 180 });

    // 4. Data Table
    autoTable(doc, {
        startY: 80,
        head: [["Preference", "Your Selection"]],
        body: [
            ["Project Type", data.projectType || "Not specified"],
            ["Location", data.location || "Not specified"],
            ["Area / Floorplan", `${data.area ? data.area + " - " : ""}${data.floorplan || "Not specified"}`],
            ["Project Stage", data.projectStage || "Not specified"],
            ["Budget Range", data.budget || "Not specified"],
            ["Target Timeline", data.timeline || "Not specified"],
            ["Material Preference", data.material || "Not specified"],
            ["Specific Requirements", data.requirements?.length > 0 ? data.requirements.join(", ") : "None selected"],
            ["Consultation Mode", data.consultationMode || "Not specified"],
        ],
        theme: "grid",
        headStyles: {
            fillColor: brass as [number, number, number],
            textColor: [255, 255, 255],
            fontStyle: "bold",
        },
        bodyStyles: {
            textColor: onyx as [number, number, number],
        },
        alternateRowStyles: {
            fillColor: offwhite as [number, number, number],
        },
        styles: {
            cellPadding: 6,
            fontSize: 10,
        }
    });

    // 5. Footer & CTA
    const finalY = (doc as any).lastAutoTable.finalY || 180;

    doc.setDrawColor(200, 200, 200);
    doc.line(14, finalY + 15, 196, finalY + 15);

    doc.setFontSize(14);
    doc.setTextColor(brass[0], brass[1], brass[2]);
    doc.text("What's Next?", 14, finalY + 30);

    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    const nextSteps = [
        "1. Our Chennai design expert will contact you within exactly the requested medium.",
        "2. We will arrange a conceptual design discussion at our studio or your site.",
        "3. Enjoy our 45-day guaranteed delivery timeframe from project sign-off.",
        "4. All our work is backed by our signature 15-year warranty."
    ];

    let currentY = finalY + 40;
    nextSteps.forEach(step => {
        doc.text(step, 14, currentY);
        currentY += 8;
    });

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("© 2026 KNB Innovations. All rights reserved.", 14, 280);
    doc.text("studio@knbinnovations.com | +91 9500107162", 196, 280, { align: "right" });

    // Save the PDF
    doc.save(`KNB_Brochure_${data.name?.replace(/\s+/g, "_") || "Consultation"}.pdf`);
};
