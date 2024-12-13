# Advent of Code Prettifier

## **Why Use the Chrome Extension?**

The Advent of Code CSS Injector is a Chrome extension designed to enhance the visual experience of the Advent of Code website. It injects custom CSS styles to personalize the website's appearance.

This extension is particularly useful for developers who participate in Advent of Code and prefer a tailored visual environment while solving coding puzzles. Fork it and customize as per your taste.

---

## **How to Load the Chrome Extension**

Follow these steps to load the Advent of Code CSS Injector extension into Chrome:

### **1. Prepare the Extension Files**
Ensure you have the following files ready in a folder on your computer:

1. **`manifest.json`**: The configuration file for the extension.
2. **`custom.css`**: The custom CSS file containing the styles to be applied.
3. **`icon.png`**: The logo or icon file for the extension.

### **2. Open Chrome Extensions Page**
1. Open the Chrome browser.
2. Navigate to the extensions page by entering the following URL in the address bar:
   ```
   chrome://extensions
   ```
3. Alternatively, click the **three-dot menu** in the top-right corner of Chrome, go to **More Tools**, and select **Extensions**.

### **3. Enable Developer Mode**
1. On the extensions page, toggle the **Developer mode** switch in the top-right corner of the page.
2. This will enable additional options for loading unpacked extensions.

### **4. Load the Unpacked Extension**
1. Click the **Load unpacked** button that appears after enabling Developer mode.
2. In the file dialog, navigate to the folder where your extension files (e.g., `manifest.json`, `custom.css`, and `icon.png`) are stored.
3. Select the folder and click **Open**.

### **5. Verify the Extension Installation**
1. After loading the folder, you should see the extension listed on the Chrome extensions page.
2. Ensure the extension is enabled by toggling the switch next to its name.
3. Test the extension by visiting [Advent of Code](https://adventofcode.com). The custom CSS should automatically apply.

### **6. (Optional) Pin the Extension**
1. Click the **Extensions** icon (puzzle piece) in the Chrome toolbar.
2. Locate the Advent of Code CSS Injector and click the pin icon to make it always visible in the toolbar.

---

## **Troubleshooting**

- **Extension Not Loading Properly**: Double-check that the `manifest.json` file is valid and properly formatted.
- **Styles Not Applying**: Ensure the `custom.css` file is correctly written and targets the appropriate elements on the Advent of Code website.
- **Error Messages**: Check the Chrome console (`Ctrl+Shift+J`) for any error logs related to the extension.

---

## **Customizing the Extension**

- **Edit Styles**: Modify the `custom.css` file to add or change the styles applied to the Advent of Code website.
- **Update the Icon**: Replace the `icon.png` file with a new logo to customize the extension’s appearance in Chrome.
- **Expand Functionality**: Update the `manifest.json` and add JavaScript files to include additional features, such as dynamic CSS changes or toggling the styles on and off.

---

## **Why not publish to Chrome Web Store?**
I don not want to publish to the public domain as this modifies a privately licensed website. It is kinda hacky anyway so not worth production publishing.