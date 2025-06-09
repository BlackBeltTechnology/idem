package hu.blackbelt.idem;


import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Builder
@Getter
@ToString
@EqualsAndHashCode
public class AstNode {
    AstNodeType type;
    Object value;
    List<AstNode> elements;
    List<String> features;

    // Postfix function calls
    String functionName;
    String sortDirection; // ASC or DESC

    AstNode selector;
    String delimiter;
    AstNode list;
    AstNode indexes;
    AstNode pointers;
    AstNode left;
    AstNode right;
    AstNode expression;
    // Self navigation
    AstNode tags;
    // Date part add / sub
    String datePart;
    // Ternary
    AstNode tCond;
    AstNode tThen;
    AstNode tElse;
}
