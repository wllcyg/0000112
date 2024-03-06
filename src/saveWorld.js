import saveAs from "file-saver";
import { Paragraph ,Document,Packer,LevelFormat,AlignmentType,createPa } from 'docx'
export function exportWordDocx(data,name){
    console.log(data,'1111111111111');
    let sections = []
    if (data) {
        data.forEach(element => {
            const keys = Object.keys(element).slice(6);
            console.log(keys);
            let params = {
                properties: {
                    pageOrientation: "landscape"
                },
                children:[]
            }
            keys.forEach(key => {
                params.children.push(
                    new Paragraph({
                        text: `${key}  ${element[key]}`,
                        spacing: {
                            before: 200,
                        },
                    })
                )
            })
            sections.push(params)
        });
    }
    const doc = new Document({
        sections,
        numbering: {
            config:[
                {
                    reference: "my-numbering",
                    levels: [
                        {
                            level: 0,
                            format: LevelFormat.UPPER_ROMAN,
                            text: "%1",
                            alignment: AlignmentType.START,
                            style: {
                                paragraph: {
                                    indent: { left:480, hanging: 320 },
                                },
                            },
                        },
                    ],
                }
            ]
        }
    });
    Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, `${name.slice(0, -5)}.docx`);
        console.log("Document created successfully");
      });
}