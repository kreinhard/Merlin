package de.reinhard.merlin.word.templating;

import de.reinhard.merlin.excel.ExcelRow;
import de.reinhard.merlin.excel.ExcelSheet;
import de.reinhard.merlin.excel.ExcelWorkbook;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.util.stream.Collectors;

public class DefinitionExcelConverter {
    public static ExcelWorkbook writeToWorkbook(TemplateDefinition template) {
        Workbook poiWorkbook = new XSSFWorkbook();
        ExcelWorkbook workbook = new ExcelWorkbook(poiWorkbook);
        ExcelSheet variablesSheet = workbook.createOrGetSheet("Variables");
        ExcelRow row = variablesSheet.createRow();
        row.createCells("Variable", "Values", "required", "unique", "type", "Minimum", "Maximum");
        for (VariableDefinition variableDefinition : template.getVariableDefinitions()) {
            row = variablesSheet.createRow();
            // Variable
            row.createCell().setCellValue(variableDefinition.getName());
            // Allowed values
            String allowedValues;
            if (CollectionUtils.isEmpty(variableDefinition.getAllowedValuesList())) {
                allowedValues = "";
            } else {
                allowedValues = variableDefinition.getAllowedValuesList().stream()
                        .map(s -> "\"" + s + "\"")
                        .collect(Collectors.joining(", "));
            }
            row.createCell().setCellValue(allowedValues);
            // required
            row.createCell().setCellValue(getBooleanAsString(variableDefinition.isRequired()));
            // unique
            row.createCell().setCellValue(getBooleanAsString(variableDefinition.isUnique()));
            // type
            //row.createCell().setCellValue(variableDefinition.getMaximumValue());
            // Minimum
            //row.createCell().setCellValue(variableDefinition.getMaximumValue());
            // Maximum

        }
        return workbook;
    }

    public static String getBooleanAsString(boolean value) {
        return value ? "X" : "";
    }

    public static boolean getStringAsBoolean(String value) {
        if (StringUtils.isBlank(value)) {
            return false;
        }
        String lower = value.toLowerCase();
        if (lower.startsWith("x") ||
                lower.startsWith("y") || // yes
                lower.startsWith("j")) { // ja - German yers.
            return true;
        }
        return false;
    }
}
