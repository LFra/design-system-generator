// Modules
import React from "react";
import { View, Text } from "react-sketchapp";
import { generateSymbol, createSymbol } from "../../util/index";

// Constants
import { BORDER_RADII, BORDER_WIDTH } from "../../theme/ids";

// Imports
import UILabel from "../UI/UILabel";

const getLabels = (name, uiShadows, themeID) => {
    const shadows = uiShadows[themeID];
    const shadowValues = index => {
        return `X: ${shadows[index].shadowOffset.width}, Y: ${
            shadows[index].shadowOffset.height
        }, B: ${shadows[index].shadowRadius}, S: ${
            shadows[index].shadowSpread
        }`;
    };
    return {
        name: `Elevation ${name}`,
        penumbra: shadowValues(0),
        umbra: shadowValues(1),
        ambient: shadowValues(2)
    };
};

// Components
const WrapperStyle = index => {
    return {
        width: "22%",
        marginBottom: 24,
        marginLeft: index % 4 === 0 || index === 0 ? 0 : "4%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        boxSizing: "border-box"
    };
};

const SwatchSymbolStyle = (
    borderRadius,
    width = 40,
    height = 40,
    backgroundColor = "rgba(0,0,0,0)"
) => {
    return {
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        position: "absolute",
        borderRadius: borderRadius
    };
};

const DescriptionItemStyle = () => {
    return {
        width: 140,
        display: "flex",
        flexDirection: "row"
    };
};

const DescriptionItem = ({ label, value, themeID }) => (
    <View name={label} style={DescriptionItemStyle()}>
        <UILabel name="value" themeId={themeID} secondary={label !== "name"}>
            {value.replace(/\b\w/g, l => l.toUpperCase()).replace(/,/g, ", ")}
        </UILabel>
    </View>
);
let r = 0;

// Create a shadow symbol for each radius
BORDER_RADII.map((borderRadius, index) => {
    createSymbol(
        () => (
            <View
                name="Square"
                style={{
                    width: 400,
                    height: 100,
                    backgroundColor: "yellow"
                }}
            >
                <Text name="Red Square Text">Red Square</Text>
            </View>
        ),
        `test/squares/${index}`
    );
});

// Render
const ShadowSwatch = ({ shadows, uiShadows, name, width, index, themeID }) => {
    const labels = getLabels(name, uiShadows, themeID);

    return (
        <View name={"swatch_" + name} style={WrapperStyle(index)}>
            <View
                style={{ width: "100%", height: 40, display: "inline-block" }}
            >
                <View
                    style={SwatchSymbolStyle(4, "100%", 24, "white")}
                    shadows={uiShadows[themeID]}
                />
            </View>
            <View style={{ marginTop: "16px" }} name="description">
                {Object.keys(labels).map(name => (
                    <DescriptionItem
                        themeID={themeID}
                        value={labels[name]}
                        label={name}
                        key={name}
                    />
                ))}
            </View>
        </View>
    );
};

export default ShadowSwatch;
