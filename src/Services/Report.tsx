// aca vamos a crear el documento del reporte de los tokens, contador de tokens.
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Set the fonts for pdfMake
pdfMake.vfs = pdfFonts.vfs;
pdfMake.vfs = pdfFonts.vfs;

const Report = (report: any ) => {
    const sections = Object.entries(report as Record<string, Record<string, number>>).map(
    ([title, conteos]) => {               //filtramos solo los que tienen mayor a 0
    const data = Object.entries(conteos).filter(([_, count]) => count > 0).map(([token, count]) => [String(token), String(count)]);
  
    return [
      { text: title, style: "header" },
      {
        table: {
          widths: ["*", "auto"],
          body: [
            ["Token", "Conteo"],
            ...data
          ]
        },
        margin: [0, 0, 0, 20] as [number, number, number, number]
      }
    ];
  });

  const docDefinition = {
    content: sections.flat(),
    styles: {
      header: { fontSize: 18, bold: true, margin: [0,0,0,10] as [number,number,number,number] }
    }
  };

    pdfMake.createPdf(docDefinition).download("reporte.pdf");


}

export default Report
