const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { categoryData, courseData } = require('./data');

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');

// Ensure directories exist
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Map of route -> view file
const staticRoutes = {
    'index.html': 'home.ejs',
    'about.html': 'about.ejs',
    'college.html': 'colleges.ejs',
    'courses.html': 'courses.ejs',
    'contactus.html': 'form.ejs'
};

const build = async () => {
    console.log('Starting static build...');

    // Render static pages
    for (const [outputFile, viewFile] of Object.entries(staticRoutes)) {
        const viewPath = path.join(viewsDir, viewFile);
        const outPath = path.join(publicDir, outputFile);
        
        try {
            const html = await ejs.renderFile(viewPath, { path: '/' + outputFile.replace('.html', '').replace('index', '') });
            fs.writeFileSync(outPath, html);
            console.log(`Generated ${outputFile}`);
        } catch (err) {
            console.error(`Error rendering ${viewFile}:`, err);
        }
    }

    // Render PG courses
    ensureDir(path.join(publicDir, 'courses', 'pg'));
    try {
        const pgViewPath = path.join(viewsDir, 'pg-course-catalog.ejs');
        const pgOutPath = path.join(publicDir, 'courses', 'pg', 'pg-programs.html');
        const pgHtml = await ejs.renderFile(pgViewPath, { path: '/courses/pg/pg-programs' });
        fs.writeFileSync(pgOutPath, pgHtml);
        console.log(`Generated courses/pg/pg-programs.html`);
    } catch (err) {
        console.error(`Error rendering PG courses:`, err);
    }

    // Render UG courses
    ensureDir(path.join(publicDir, 'courses', 'ug'));
    for (const category of Object.keys(categoryData)) {
        const ugViewPath = path.join(viewsDir, 'ug-course-catalog.ejs');
        const ugOutPath = path.join(publicDir, 'courses', 'ug', `${category}.html`);
        
        try {
            const ugHtml = await ejs.renderFile(ugViewPath, {
                category: categoryData[category],
                courses: courseData[category] || [],
                path: `/courses/ug/${category}`
            });
            fs.writeFileSync(ugOutPath, ugHtml);
            console.log(`Generated courses/ug/${category}.html`);
        } catch (err) {
            console.error(`Error rendering UG course ${category}:`, err);
        }
    }

    console.log('Build completed successfully!');
};

build();
