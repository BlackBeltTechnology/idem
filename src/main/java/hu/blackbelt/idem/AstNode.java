package hu.blackbelt.idem;


import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.Collection;
import java.util.List;

@Builder
@Getter
@EqualsAndHashCode
@ToString
public class AstNode {
    AstNodeType type;
    Object value;
    List<AstNode> elements;
    List<String> features;

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
