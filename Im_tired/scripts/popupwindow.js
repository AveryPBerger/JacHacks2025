/**
 * Opens a popup window with specified information
 * @param {Object} info - Information to display in the popup
 * @param {string} info.title - Title of the popup
 * @param {string} info.content - Main content text
 * @param {string} info.waterUsage - Water usage information
 * @returns {Window|null} - The popup window object or null if blocked
 */
const openPopupWindow = (info) => {
    const popup = window.open("", "_blank", "width=600,height=400");
    
    if (!popup) {
        alert("Popup was blocked. Please allow popups for this site.");
        return null;
    }
    
    popup.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${info.title}</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f5f7fa;
                    color: #333;
                }
                .popup-container {
                    max-width: 100%;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }
                h1 {
                    color: #2c5282;
                    margin-top: 0;
                    font-size: 1.5rem;
                }
                .water-usage {
                    background-color: #ebf8ff;
                    border-left: 4px solid #3182ce;
                    padding: 12px;
                    margin: 20px 0;
                    border-radius: 0 4px 4px 0;
                }
                .water-usage h3 {
                    margin-top: 0;
                    color: #2c5282;
                }
                p {
                    line-height: 1.6;
                }
                .close-btn {
                    display: block;
                    width: 100%;
                    padding: 10px;
                    background-color: #4299e1;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    margin-top: 20px;
                    cursor: pointer;
                    font-weight: 500;
                }
                .close-btn:hover {
                    background-color: #3182ce;
                }
            </style>
        </head>
        <body>
            <div class="popup-container">
                <h1>${info.title}</h1>
                <p>${info.content}</p>
                
                <div class="water-usage">
                    <h3>Water Usage:</h3>
                    <p>${info.waterUsage}</p>
                </div>
                
                <button class="close-btn" onclick="window.close()">Close</button>
            </div>
        </body>
        </html>
    `);
    
    popup.document.close();
    return popup;
};

// Use default export to make it importable as "import popupwindow from './popupwindow'"
export default openPopupWindow;