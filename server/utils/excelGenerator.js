// import excel from "exceljs";

// export const generateExcelReport = async (users) => {
//   const workbook = new excel.Workbook();
//   const worksheet = workbook.addWorksheet("Coordinator Report");

//   // Add headers
//   worksheet.columns = [
//     { header: "Name", key: "name", width: 30 },
//     { header: "Email", key: "email", width: 30 },
//     { header: "Assigned Task", key: "task", width: 40 },
//     { header: "Task Status", key: "status", width: 15 },
//     { header: "Start Date", key: "startDate", width: 15 },
//     { header: "End Date", key: "endDate", width: 15 },
//     { header: "Completion Date", key: "completionDate", width: 15 },
//   ];

//   // Add data
//   users.forEach((user) => {
//     worksheet.addRow({
//       name: user.name,
//       email: user.email,
//       task: user.assignedTask || "N/A",
//       status: user.taskStatus || "N/A",
//       startDate: user.taskStartDate
//         ? new Date(user.taskStartDate).toLocaleDateString()
//         : "N/A",
//       endDate: user.taskEndDate
//         ? new Date(user.taskEndDate).toLocaleDateString()
//         : "N/A",
//       completionDate: user.taskCompletedAt
//         ? new Date(user.taskCompletedAt).toLocaleDateString()
//         : "N/A",
//     });
//   });

//   // Generate Excel file
//   const buffer = await workbook.xlsx.writeBuffer();
//   return buffer;
// };

import Excel from "exceljs";

export const generateExcelReport = async (users) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Coordinator Report");

  // Coordinator sheet headers
  worksheet.columns = [
    { header: "Name", key: "name", width: 30 },
    { header: "Email", key: "email", width: 30 },
    { header: "Assigned Task", key: "task", width: 40 },
    { header: "Task Status", key: "status", width: 15 },
    { header: "Start Date", key: "startDate", width: 15 },
    { header: "End Date", key: "endDate", width: 15 },
    { header: "Completion Date", key: "completionDate", width: 15 },
  ];

  users.forEach((user) => {
    worksheet.addRow({
      name: user.name,
      email: user.email,
      task: user.assignedTask || "N/A",
      status: user.taskStatus || "N/A",
      startDate: user.taskStartDate
        ? new Date(user.taskStartDate).toLocaleDateString()
        : "N/A",
      endDate: user.taskEndDate
        ? new Date(user.taskEndDate).toLocaleDateString()
        : "N/A",
      completionDate: user.taskCompletedAt
        ? new Date(user.taskCompletedAt).toLocaleDateString()
        : "N/A",
    });
  });

  return workbook.xlsx.writeBuffer();
};

/**
 * Generates a Technology-Transfer Excel:
 *
 * Columns:
 *  • Name of the Technology
 *  • Year of Development
 *  • Premia (Cost)
 *  • Product Information (PI)
 *  • Member
 *  • License Details (Name, Address, Contact)
 *  • [OPTIONAL] One date-column per process step
 *
 * @param {Array<User>} users
 * @param {Object}   techFlowDates  — e.g. { paymentReceived: Date, entryAms: Date, … }
 */
// export const generateTechTransferReport = async (
//   users,
//   techFlowDates = {}
// ) => {
//   const workbook = new Excel.Workbook();
//   const sheet = workbook.addWorksheet("Tech Transfer");

//   // Define your headers — if you want each process-step date as a column, add them here:
//   sheet.columns = [
//     { header: "Name of the Technology",      key: "techName",        width: 30 },
//     { header: "Year of Development",         key: "yearDev",         width: 15 },
//     { header: "Premia (Cost)",               key: "premia",          width: 15 },
//     { header: "Product Information (PI)",    key: "productInfo",     width: 30 },
//     { header: "Member",                      key: "member",          width: 25 },
//     { header: "License Details",             key: "licenseDetails",  width: 40 },
//     // If you captured dates in the UI, uncomment these:
//     // { header: "Payment Received",                   key: "paymentReceivedDate", width: 15 },
//     // { header: "Entry into AMS",                     key: "entryAmsDate",        width: 15 },
//     // { header: "Draft Agreement",                    key: "draftAgreementDate",  width: 15 },
//     // { header: "Dasian",                             key: "dasianDate",          width: 15 },
//     // { header: "Demonstrate",                        key: "demonstrateDate",     width: 15 },
//     // { header: "Demonstration & Certificate Gen.",   key: "demoCertDate",        width: 20 },
//   ];

//   users.forEach((u) => {
//     sheet.addRow({
//       techName:         u.onboarding?.details?.technologyName || "",
//       yearDev:          u.onboarding?.details?.yearDevelopment  || "",
//       premia:           u.onboarding?.details?.premia           || "",
//       productInfo:      u.onboarding?.details?.productInfo      || "",
//       member:           u.name,
//       licenseDetails:   `${u.onboarding?.details?.address || ""}, ${
//                           u.onboarding?.details?.contact || ""
//                         }`,
//       // If you captured the flow dates in your request body, merge them here:
//       // paymentReceivedDate: techFlowDates.paymentReceived?.toLocaleDateString() || "",
//       // entryAmsDate:        techFlowDates.entryAms?.toLocaleDateString()       || "",
//       // …
//     });
//   });

//   return workbook.xlsx.writeBuffer();
// };

export const generateTechTransferReport = async (docs) => {
  const wb = new Excel.Workbook();
  const ws = wb.addWorksheet("Annual Tech Transfer");

  ws.columns = [
    { header: "Name of the Technology", key: "techName", width: 30 },
    { header: "Year of Development", key: "yearDev", width: 15 },
    { header: "Premia (Cost)", key: "premia", width: 15 },
    { header: "Product Information (PI)", key: "pi", width: 30 },
    { header: "Member", key: "member", width: 25 },
    { header: "License Details", key: "license", width: 40 },
  ];

  docs.forEach((doc) => {
    // assume the *first* flow.step is your “technology name”,
    // and you stored yearDev, premia, pi in the flow.details or in user model.
    const techName = doc.flows[0]?.step || "";
    const yearDev = doc.flows[1]?.step || ""; // or pull from details
    const premia = doc.flows[2]?.details || ""; // if you used details to store cost
    const pi = doc.flows[3]?.details || "";
    const member = doc.coordinator.name;
    const license = `${doc.coordinator.onboarding?.details?.address || ""} — ${
      doc.coordinator.onboarding?.details?.contact || ""
    }`;

    ws.addRow({ techName, yearDev, premia, pi, member, license });
  });

  return wb.xlsx.writeBuffer();
};
