# Laboratory Instrument Management App

_One platform to keep your lab instruments reliable, compliant, and under control._

Modern laboratories rely on a wide variety of instruments, each with its own maintenance schedules, calibration requirements, and quality control routines. Managing all this information consistently can be challenging, especially when data is scattered across spreadsheets, logbooks, or different systems.

This application provides a centralized platform to simplify that process. It enables laboratories to:

- Record and track abnormal or out-of-spec events across different instruments
- Manage calibration status, maintenance history, and related documentation

By bringing these functions together, the application helps laboratories improve transparency, maintain compliance, and support the reliability of measurement results, while simplifying daily lab operations.

## Live demo

The application is hosted on the author's cloud server and can be found at https://instrument-manager.mitakil.com.
In portfolio version two demo users are available:

- John Doe: username `johndoe`, password `DemoPassword25`, role `user`
- Jane Doe: username `janedoe`, password `DemoPassword25`, role `engineer`

Some features of the application is restricted to certain user roles. The permission matrix can be found on the applications About page.

## Usage

Log in with one of the demo users. Engineers can add and edit instruments and record calibrations. Users can browse instruments and comment.

- **Find instruments**: search by name or serial, filtre by group, calibration or QC check status, or click quick filter (e.g. _Calibration overdue_) to show only those instruments.
- **Add an instrument:** _Add instrument_ → fill in the form → _Save_.
- **Edit an instrument or change its status:** open the instrument by clicking it's name → _Edit instrument_.
- **Record a calibration:** on the instrument page → _Add calibration_ → fill details and attach the certificate PDF. The next calibration date is calculated from the instrument's calibration interval.
- **View a calibration and its certificate:** open it from the calibration history.
- **Comment:** open the comments of an instrument in the list to report an issue by clickin _Add comment_.

## Known limitations and future work (a.k.a. TODO list)

- [x] Replies to comments can be viewed but not yet added from the UI
- [ ] Instrument listing includes all the instruments from database. This shall be filtered based on instrument status (soft delete for retired instruments to still keep trace of the instruments)
- [ ] Instrument details page does not yet show the usage status
- [ ] Harmonize modals for consistent UI-experience
- [ ] Add an audit log for each instrument showing what was changed, when and by whom
- [ ] Use instrument-specific QC demo data (currently every instrument shows the same pH QC data)
- [ ] Add download calibration document and preview view
- [ ] End to end and unit testing
- [ ] No error messages in frontend for user (e.g. missing fields)
- [ ] Rename backend routes for more clarity (check sub-comment post)

## Tech stack

| Layer    | Technology                 |
| -------- | -------------------------- |
| Frontend | React (Vite), Tailwind CSS |
| Backend  | Node.js (Express)          |
| Database | PostgreSQL                 |
| Tools    | Git, GitHub                |

## Hosting and deployment

- Self hosted on a virtual server (Infra and portfolio page in different repository)
- Application runs on Docker container
- Caddy as reverse proxy
- Github action builds a Docker image that is published in Github Container Registry. Server pulls new image
- Database migrations run automatically when container starts

## Project history

This repository starts from version 1.0. The full development history is kept in private repository and is available on request.
